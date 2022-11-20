import { View } from "./enumerations";
import type { Bartender } from "./lib/interfaces"
import { writable } from "svelte/store";

export const applicationViewStat = writable<View>(View.LOGIN)

export const currentBartender = writable<Bartender>(null);

export const credentials = writable<Headers>(null);