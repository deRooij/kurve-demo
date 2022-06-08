import { NextRouter } from 'next/router'
import React from 'react'
import { PerspectiveCamera } from "three"
import type { OrbitControls } from 'three-stdlib'
import create, { GetState, SetState } from 'zustand'

export interface Store extends DomSlice, RouterSlice, InteractionSlice {}

export interface DomSlice {
    dom: any
}

const createDomSlice: (
  set: SetState<Store>,
  get: GetState<Store>
) => DomSlice = (set, get) => ({
  dom: null
})

export interface RouterSlice {
    router: NextRouter
    setRouter: (value: RouterSlice["router"]) => void
}

const createRouterSlice: (
  set: SetState<Store>,
  get: GetState<Store>
) => RouterSlice = (set, get) => ({
  router: null,
  setRouter: (router) => { set({router})}
})

export interface CameraSlice {
  cameraRef: React.RefObject<PerspectiveCamera>
  controlsRef: React.RefObject<OrbitControls>
}

const createCameraSlice: (
  set: SetState<Store>,
  get: GetState<Store>
) => CameraSlice = (set, get) => ({
  cameraRef: null,
  controlsRef: null
})

export interface InteractionSlice {
  width: number
  height: number
  depth: number
  setWidth: (value: InteractionSlice["width"]) => void
  setHeight: (value: InteractionSlice["height"]) => void
  setDepth: (value: InteractionSlice["depth"]) => void
}

const createInteractionSlice: (
  set: SetState<Store>,
  get: GetState<Store>
) => InteractionSlice = (set, get) => ({
  width: 1,
  height: 1,
  depth: 1,
  setWidth: (width) => { set({ width })},
  setHeight: (height) => { set({ height })},
  setDepth: (depth) => { set({ depth })}
})

const useStore = create<Store>((get, set) => ({
  ...createRouterSlice(get, set),
  ...createDomSlice(get, set),
  ...createInteractionSlice(get, set),
  ...createCameraSlice(get, set)
}))

export default useStore
