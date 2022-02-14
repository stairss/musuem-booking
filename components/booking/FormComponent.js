import React, { useEffect, useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PublicIcon from '@mui/icons-material/Public'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useRouter } from 'next/router'
import dateFormat, { masks } from 'dateformat'
import { i18n } from 'dateformat'

i18n.dayNames = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sobota',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Niedziela',
]

i18n.monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Stycznia',
  'Lutego',
  'Marca',
  'Kwietnia',
  'Maja',
  'Czerwca',
  'Lipca',
  'Sierpnia',
  'Września',
  'Października',
  'Listopada',
  'Grudnia',
]

const FormComponent = () => {
  const router = useRouter()
  const [formatedDate, setFormatedDate] = useState('')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [number, setNumber] = useState(0)
  const hour = router?.query?.form
  const date = router.query.date

  useEffect(() => {
    if (loading) {
      const day = date?.slice(0, 2)
      const month = date?.slice(3, 5)
      const year = date?.slice(6, 10)

      if (day && month && year) {
        setFormatedDate(`${month}/${day}/${year}`)
        setLoading(false)
      }
    }
  }, [date])

  const fetchData = async () => {
    const response = await fetch('/api/data')
    const data = await response.json()
    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = async () => {
    const response = await fetch(`/api/data/${date}/${hour}`, {
      method: 'PUT',
      body: JSON.stringify({ number }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
    fetchData()
    setNumber(0)
    alert('Zarezerwowano miejsce')
    router.push('/')
  }

  return (
    <div className="mx-auto flex flex-col items-center py-4 px-2 font-bold darken:text-white inverted:text-yellow-400">
      {data[date]?.hours[hour] ? (
        <>
          {' '}
          <div className="relative mb-4 flex h-[10%] w-full items-center justify-center  text-center ">
            <ArrowBackIosIcon
              style={{ transform: 'translateY(-50%)' }}
              className="absolute left-[10%] top-[50%] cursor-pointer"
              onClick={() => router.push(`/${date}`)}
            />
            <h1 className="text-2xl">Rezerwacja</h1>
          </div>
          <div className="flex flex-col items-start pb-4 lg:items-center">
            <div className="flex flex-col lg:flex-row">
              <div className=" mr-8 mb-1 flex text-[#767676] darken:text-white inverted:text-yellow-400">
                <AccessTimeIcon className="mr-2" />
                <div>30 min</div>
              </div>
              <div className="mb-1 flex">
                <LocationOnIcon className="mr-2" />
                <div>Maksymiliana Kolbego 2A, 32-600 Oświęcim</div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row ">
              <div className="mr-8 mb-1 flex">
                <CalendarTodayIcon className="mr-2" />
                <div>
                  {hour
                    ? `${hour?.replace(/-/g, ':')} - ${hour.slice(0, 2)}:30, `
                    : ''}
                  {/* Sobota 6 Lutego 2022r. */}
                  {!loading
                    ? `${dateFormat(formatedDate, 'dddd')}
                  ${dateFormat(formatedDate, 'd')} 
                   ${dateFormat(formatedDate, 'mmmm')} ${dateFormat(
                        formatedDate,
                        'yyyy'
                      )}r.`
                    : ''}
                </div>
              </div>
              <div>
                <div className="mb-1 flex">
                  <PublicIcon className="mr-2" />
                  <div>Muzeum Pamięci Mieszkańców Ziemi Oświęcimskiej</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t-[1px] border-solid border-[rgba(0,0,0,.1)] pt-4 text-center">
            <h2 className="pb-2 text-lg">Wprowadź dane</h2>
            <div className="flex flex-col items-center">
              <label className="mb-4 flex w-1/2 flex-col items-start">
                <span className="mb-1 text-sm">Imię *</span>
                <input
                  type="text"
                  className="w-full rounded-md border-[1px] border-[rgb(0,0,0,.2)] py-2 darken:text-black inverted:border inverted:border-yellow-400 inverted:bg-black inverted:text-yellow-400"
                />
              </label>
              <label className="mb-4 flex w-1/2 flex-col items-start">
                <span className="mb-1 text-sm">Nazwisko *</span>
                <input
                  type="text"
                  className="w-full rounded-md border-[1px] border-[rgb(0,0,0,.2)] py-2 darken:text-black inverted:border inverted:border-yellow-400 inverted:bg-black inverted:text-yellow-400"
                />
              </label>
              <label className="mb-4 flex w-1/2 flex-col items-start">
                <span className="mb-1 text-sm">Email *</span>
                <input
                  type="text"
                  className="w-full rounded-md border-[1px] border-[rgb(0,0,0,.2)] py-2 darken:text-black inverted:border inverted:border-yellow-400 inverted:bg-black inverted:text-yellow-400"
                />
              </label>
              <label className="mb-4 flex w-1/2 flex-col items-start">
                <span className="mb-1 text-sm">Numer telefonu *</span>
                <input
                  type="tel"
                  className="w-full rounded-md border-[1px] border-[rgb(0,0,0,.2)] py-2 darken:text-black inverted:border inverted:border-yellow-400 inverted:bg-black inverted:text-yellow-400"
                />
              </label>
              <label className="mb-4 flex w-1/2 flex-col items-start">
                <span className="mb-1 text-sm">Ilość biletów *</span>
                <input
                  type="number"
                  className="w-full rounded-md border-[1px] border-[rgb(0,0,0,.2)] py-2 darken:text-black inverted:border inverted:border-yellow-400 inverted:bg-black inverted:text-yellow-400"
                  value={number}
                  onChange={(e) => setNumber(+e.target.value)}
                />
              </label>
              <button
                className="h-10 rounded border border-solid border-stone-600 px-8 py-1 inverted:border-yellow-400"
                onClick={handleClick}
              >
                Potwierdź
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default FormComponent
