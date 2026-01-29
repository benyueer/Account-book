import { ImportRecordStatus } from '@account-book/types'
import {
  Button,
  DotLoading,
  Empty,
  InfiniteScroll,
  List,
  NavBar,
  PullToRefresh,
  Tag,
  Toast,
} from 'antd-mobile'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useImportRecords,
  useUploadRecord,
} from '../hooks/api/useImportRecords'

export default function ImportRecords() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const abortControllerRef = useRef<AbortController | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data, isLoading, refetch } = useImportRecords({
    page,
    limit: 15,
  }) as { data: any, isLoading: boolean, refetch: any }
  const uploadMutation = useUploadRecord()

  // 由于后端没提供标准的 useInfiniteQuery 结构，这里手动处理分页加载
  const handleLoadMore = async () => {
    setPage(p => p + 1)
  }

  const handleRefresh = async () => {
    setPage(1)
    await refetch()
  }

  const handleUpload = async (file: File) => {
    const toast = Toast.show({
      icon: <DotLoading />,
      content: '正在上传...',
      duration: 0,
    })

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    uploadMutation.mutate(
      {
        file,
        abortSignal: abortController.signal,
      },
      {
        onSuccess: () => {
          Toast.show({ icon: 'success', content: '上传成功' })
          handleRefresh()
        },
        onError: (e: any) => {
          if (e.name === 'CanceledError' || e.name === 'AbortError') {
            Toast.show('上传已取消')
          }
          else {
            Toast.show({ icon: 'fail', content: '上传失败' })
          }
        },
        onSettled: () => {
          toast.close()
          abortControllerRef.current = null
          if (fileInputRef.current)
            fileInputRef.current.value = ''
        },
      },
    )
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  const statusMap: Record<ImportRecordStatus, { color: string, text: string }>
    = {
      [ImportRecordStatus.PENDING]: { color: 'warning', text: '处理中' },
      [ImportRecordStatus.SUCCESS]: { color: 'success', text: '成功' },
      [ImportRecordStatus.FAILED]: { color: 'danger', text: '失败' },
    }

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 flex flex-col bg-slate-50"
    >
      <NavBar
        onBack={async () => navigate(-1)}
        className="sticky top-0 z-10 flex-shrink-0 bg-white"
      >
        导入记录
      </NavBar>

      <div className="mb-2 flex items-center justify-between bg-white p-4 shadow-sm">
        <span className="text-sm text-slate-500">账单导入历史</span>
        <div className="flex gap-2">
          {uploadMutation.isPending && (
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
            accept=".csv,.xlsx"
            style={{ display: 'none' }}
          />
          <Button
            size="small"
            color="primary"
            loading={uploadMutation.isPending}
            onClick={() => fileInputRef.current?.click()}
          >
            导入账单
          </Button>
        </div>
      </div>

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="h-[calc(100vh-120px)] overflow-y-auto">
          {isLoading && (!data || data.items.length === 0)
            ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <DotLoading color="primary" />
                  <span className="mt-2 text-xs text-slate-400">
                    正在加载记录...
                  </span>
                </div>
              )
            : !data || data.items.length === 0
                ? (
                    <Empty description="暂无导入记录" className="py-20" />
                  )
                : (
                    <List className="bg-transparent">
                      {data.items.map((item: any) => (
                        <List.Item
                          key={item.id}
                          className="mx-4 mb-2 rounded-xl border-none bg-white shadow-sm"
                          prefix={(
                            <div
                              className={`h-10 w-10 flex items-center justify-center rounded-full ${
                                item.fileType?.includes('csv')
                                  ? 'bg-blue-50 text-blue-500'
                                  : 'bg-orange-50 text-orange-500'
                              }`}
                            >
                              <div
                                className={
                                  item.fileType?.includes('csv')
                                    ? 'i-mdi-file-csv text-xl'
                                    : 'i-mdi-file-xml text-xl'
                                }
                              />
                            </div>
                          )}
                          description={(
                            <div className="mt-1 flex flex-col gap-1">
                              <div className="text-xs text-slate-400">
                                {dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                              </div>
                              {item.status === ImportRecordStatus.SUCCESS && (
                                <div className="text-xs text-slate-500">
                                  总计:
                                  {' '}
                                  {item.totalCount}
                                  {' '}
                                  | 成功:
                                  {' '}
                                  {item.successCount}
                                  {' '}
                                  |
                                  失败:
                                  {' '}
                                  {item.failCount}
                                </div>
                              )}
                              {item.errorMessage && (
                                <div className="text-xs text-red-500">
                                  {item.errorMessage}
                                </div>
                              )}
                            </div>
                          )}
                        >
                          <div className="w-full flex items-center justify-between">
                            <span className="max-w-[150px] truncate text-slate-800 font-medium">
                              {item.fileName}
                            </span>
                            <Tag
                              color={statusMap[item.status as ImportRecordStatus].color}
                              fill="outline"
                              className="rounded-md px-1.5 py-0.5 text-[10px]"
                            >
                              {statusMap[item.status as ImportRecordStatus].text}
                            </Tag>
                          </div>
                        </List.Item>
                      ))}
                    </List>
                  )}
          <InfiniteScroll
            loadMore={handleLoadMore}
            hasMore={data ? page < data.totalPages : false}
          />
        </div>
      </PullToRefresh>
    </motion.div>
  )
}
