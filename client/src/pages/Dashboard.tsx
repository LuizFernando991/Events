// import { Button } from '@/components/ui/button'
import { useApi } from '@/hooks/useApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { Event } from '@/types/Event'
import LoadingScreen from '@/components/LoadingScreen'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const api = useApi({ shouldRefreshToken: true })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await api.get('/event/userevents', { signal })
        setEvents(data.events)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.code !== 'ERR_CANCELED') {
          toast({
            variant: 'destructive',
            title: 'Ah não! Algo deu errado, tente mais tarde.'
          })
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      controller.abort()
    }
  }, [api])
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="grow mx-auto max-w-7xl md:p-10">
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
            <h1 className="mb-3 font-bold text-5xl text-gray-900">
              Meus eventos
            </h1>

            {/* <UploadButton isSubscribed={subscriptionPlan.isSubscribed} /> */}
          </div>
          {/* display all user events */}
          {events.length !== 0 && (
            <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
                >
                  <Link
                    to={`/dashboard/${event.id}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-lg font-medium text-zinc-900">
                            {event.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      {/* <Plus className="h-4 w-4" /> */}
                      {/* {format(new Date(event.createdAt), 'MMM yyyy')} */}
                      {event.createdAt.toString()}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* <MessageSquare className="h-4 w-4" /> */}
                      mocked
                    </div>

                    {/* <Button
                  onClick={() => deleteFile({ id: file.id })}
                  size="sm"
                  className="w-full"
                  variant="destructive"
                >
                  {currentlyDeletingFile === file.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button> */}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      )}
    </>
  )
}

export default Dashboard
