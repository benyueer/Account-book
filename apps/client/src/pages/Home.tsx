export default function Home() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">账目列表</h1>
      <div className="flex flex-col gap-2">
        <div className="border border-white/10 rounded-xl bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span>日常饮食</span>
            <span className="text-red-400">-¥25.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
