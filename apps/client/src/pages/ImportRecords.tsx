import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  PullToRefresh,
  List,
  InfiniteScroll,
  NavBar,
  Button,
  Toast,
  Tag,
  DotLoading,
  Empty,
} from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { importRecordService } from "../api/import-records";
import { ImportRecordStatus } from "@account-book/types";
import type { ImportRecord } from "@account-book/types";
import dayjs from "dayjs";

export default function ImportRecords() {
  const navigate = useNavigate();
  const [data, setData] = useState<ImportRecord[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMore = async (isReset = false) => {
    const currentPage = isReset ? 1 : page;
    try {
      const response = await importRecordService.findAll({
        page: currentPage,
        limit: 15,
      });
      if (isReset) {
        setData(response.items);
      } else {
        setData((prev) => [...prev, ...response.items]);
      }
      setPage(currentPage + 1);
      setHasMore(currentPage < response.totalPages);
    } catch (e) {
      console.error(e);
      setHasMore(false);
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    loadMore(true);
  }, []);

  const handleUpload = async (file: File) => {
    if (isUploading) return;

    setIsUploading(true);
    const toast = Toast.show({
      icon: <DotLoading />,
      content: "正在上传...",
      duration: 0,
    });

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      await importRecordService.upload(file, undefined, abortController.signal);
      Toast.show({
        icon: "success",
        content: "上传成功，后台处理中",
      });
      // 重新加载列表
      loadMore(true);
    } catch (e: any) {
      if (e.name === "CanceledError" || e.name === "AbortError") {
        Toast.show("上传已取消");
      } else {
        Toast.show({
          icon: "fail",
          content: "上传失败",
        });
      }
    } finally {
      setIsUploading(false);
      toast.close();
      abortControllerRef.current = null;
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const statusMap: Record<ImportRecordStatus, { color: string; text: string }> =
    {
      [ImportRecordStatus.PENDING]: { color: "warning", text: "处理中" },
      [ImportRecordStatus.SUCCESS]: { color: "success", text: "成功" },
      [ImportRecordStatus.FAILED]: { color: "danger", text: "失败" },
    };

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-slate-50 flex flex-col"
    >
      <NavBar
        onBack={() => navigate(-1)}
        className="bg-white sticky top-0 z-10 flex-shrink-0"
      >
        导入记录
      </NavBar>

      <div className="p-4 bg-white mb-2 flex justify-between items-center shadow-sm">
        <span className="text-sm text-slate-500">账单导入历史</span>
        <div className="flex gap-2">
          {isUploading && (
            <Button
              size="small"
              color="danger"
              fill="outline"
              onClick={handleCancel}
            >
              取消上传
            </Button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept=".csv,.xml"
            style={{ display: "none" }}
          />
          <Button
            size="small"
            color="primary"
            loading={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            导入账单
          </Button>
        </div>
      </div>

      <PullToRefresh onRefresh={() => loadMore(true)}>
        <div className="h-[calc(100vh-120px)] overflow-y-auto">
          {isInitialLoading && data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <DotLoading color="primary" />
              <span className="text-xs text-slate-400 mt-2">
                正在加载记录...
              </span>
            </div>
          ) : data.length === 0 ? (
            <Empty description="暂无导入记录" className="py-20" />
          ) : (
            <List className="bg-transparent">
              {data.map((item) => (
                <List.Item
                  key={item.id}
                  className="mb-2 mx-4 rounded-xl shadow-sm border-none bg-white"
                  prefix={
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.fileType?.includes("csv")
                          ? "bg-blue-50 text-blue-500"
                          : "bg-orange-50 text-orange-500"
                      }`}
                    >
                      <div
                        className={
                          item.fileType?.includes("csv")
                            ? "i-mdi-file-csv text-xl"
                            : "i-mdi-file-xml text-xl"
                        }
                      />
                    </div>
                  }
                  description={
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="text-xs text-slate-400">
                        {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                      </div>
                      {item.status === ImportRecordStatus.SUCCESS && (
                        <div className="text-xs text-slate-500">
                          总计: {item.totalCount} | 成功: {item.successCount} |
                          失败: {item.failCount}
                        </div>
                      )}
                      {item.errorMessage && (
                        <div className="text-xs text-red-500">
                          {item.errorMessage}
                        </div>
                      )}
                    </div>
                  }
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium text-slate-800 truncate max-w-[150px]">
                      {item.fileName}
                    </span>
                    <Tag
                      color={statusMap[item.status].color}
                      fill="outline"
                      className="rounded-md px-1.5 py-0.5 text-[10px]"
                    >
                      {statusMap[item.status].text}
                    </Tag>
                  </div>
                </List.Item>
              ))}
            </List>
          )}
          <InfiniteScroll loadMore={() => loadMore(false)} hasMore={hasMore} />
        </div>
      </PullToRefresh>
    </motion.div>
  );
}
