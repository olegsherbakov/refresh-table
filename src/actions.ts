import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { IState, ActionTypes, Actions } from './types'

type ThunkResult<T> = ThunkAction<T, IState, undefined, ActionTypes>

const getRandomGithubUser = (): string => {
  const users = [`facebook`, `google`, `yandex`, `microsoft`, `apple`, `airbnb`]

  return users[(Math.random() * users.length) | 0]
}

export const init: ActionCreator<ThunkResult<void>> = () => {
  return async function(dispatch) {
    // first load
    await dispatch(fetchData())
    // load in stash
    dispatch(fetchData(true))
  }
}

export const reloadAfterDelay: ActionCreator<ThunkResult<void>> = () => {
  return function(dispatch) {
    // replace data from stash
    dispatch({ type: Actions.STASH })
    // load in stash
    dispatch(fetchData(true))
  }
}

export const fetchData: ActionCreator<ThunkResult<
  Promise<ActionTypes | void>
>> = (isLoadInStash: boolean = false) => {
  return async function(dispatch, getState) {
    const {
      table: { isLoading },
    } = getState()
    const user = getRandomGithubUser()
    const url = `https://api.github.com/users/${user}/repos?per_page=100`

    if (isLoading) {
      return
    }

    dispatch({ type: Actions.LOAD })

    const items = await fetch(url).then(result => {
      if (!result.ok) {
        throw new Error(`fetch error!`)
      }

      return result.json()
    })

    return dispatch({
      type: Actions.SUCCESS,
      payload: { user, items, isLoadInStash },
    })
  }
}
