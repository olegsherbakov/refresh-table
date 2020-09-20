import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import { Actions, ActionTypes, TTableState } from './types'

const initTableState: TTableState = {
  isLoaded: false,
  isLoading: false,
  stash: {
    user: undefined,
    items: [],
  },
  data: {
    user: undefined,
    items: [],
  },
}

const table = (state: TTableState = initTableState, action: ActionTypes) => {
  switch (action.type) {
    case Actions.LOAD: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.SUCCESS: {
      const { user, items, isLoadInStash } = action.payload

      return {
        ...state,
        [isLoadInStash ? `stash` : `data`]: {
          items: [...items],
          user,
        },
        isLoaded: true,
        isLoading: false,
      }
    }
    case Actions.STASH: {
      return {
        ...state,
        data: {
          user: state.stash.user,
          items: [...state.stash.items],
        },
      }
    }
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    table,
  }),
  applyMiddleware(thunk)
)

export default store
