'use client'

import { makePage } from '@keystatic/next/ui/app'
import config from '../../../keystatic.config'

// Administrace je čistě klientská aplikace. V serverové komponentě se
// `@keystatic/core/ui` přeloží na prázdnou náhradu (export `react-server`),
// která nevykreslí nic — proto musí být tenhle soubor 'use client'.
export default makePage(config)
