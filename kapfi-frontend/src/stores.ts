import { View } from "./enumerations";
import type { Bartender } from "./lib/interfaces"
import { writable } from "svelte/store";

export const applicationViewStat = writable<View>(View.DRINKS)

export const currentBartender = writable<Bartender>(null);