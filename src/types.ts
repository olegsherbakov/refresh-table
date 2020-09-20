export type TTableState = {
  isLoaded: boolean
  isLoading: boolean
  stash: {
    user: string
    items: any[]
  }
  data: {
    user: string
    items: any[]
  }
}

export interface IState {
  table: TTableState
}

interface IInitAction {
  type: typeof Actions.INIT
}

interface IFetchAction {
  type: typeof Actions.LOAD
}

interface ISuccessAction {
  type: typeof Actions.SUCCESS
  payload: {
    user: string
    items: []
    isLoadInStash: boolean
  }
}
interface IStashAction {
  type: typeof Actions.STASH
}

export enum Actions {
  INIT,
  LOAD,
  SUCCESS,
  STASH,
}

export type ActionTypes =
  | IInitAction
  | IFetchAction
  | ISuccessAction
  | IStashAction
