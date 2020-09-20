import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSpinnerTimer from 'react-spinner-timer'

import { init, reloadAfterDelay } from './actions'
import Table from './Table'
import { IState } from './types'

const columns = [
  { Header: `Название`, accessor: `name` },
  { Header: `Описание`, accessor: `description` },
  { Header: `Язык`, accessor: `language` },
  { Header: `Размер`, accessor: `size` },
]
const selectIsLoaded = (state: IState) => state.table.isLoaded
const selectIsLoading = (state: IState) => state.table.isLoading
const selectUser = (state: IState) => state.table.data.user
const selectItems = (state: IState) => state.table.data.items

const App: React.FC<{ delay: number }> = ({ delay }) => {
  const dispatch = useDispatch()
  const isLoaded = useSelector(selectIsLoaded)
  const isLoading = useSelector(selectIsLoading)
  const user = useSelector(selectUser)
  const data = useSelector(selectItems)
  const handleOnLapInteraction = (lap: any) => {
    if (lap.isFinish) {
      dispatch(reloadAfterDelay())
    }
  }

  React.useEffect(() => {
    dispatch(init())
  }, [])

  console.log(`?isLoaded`, isLoaded)

  if (!isLoaded) {
      return <h1>Идет загрузка данных...</h1>
  }

  return (
    <>
      <h1>Example of table view component</h1>
      <p>
        Current user: <b>{user}</b>
      </p>
      <div className="spinner">
        <ReactSpinnerTimer
          onLapInteraction={handleOnLapInteraction}
          timeInSeconds={delay}
          totalLaps={1}
          isRefresh={isLoading}
        />
      </div>
      <Table columns={columns} data={data} />
    </>
  )
}

export default App
