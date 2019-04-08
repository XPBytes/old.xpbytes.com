/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import '@webcomponents/custom-elements'

import '@github/g-emoji-element'
import 'details-element-polyfill'
import 'details-dialog-element'

// You can delete this file if you're not using it
export const onServiceWorkerUpdateReady = () => {
  window.location.reload()
}
