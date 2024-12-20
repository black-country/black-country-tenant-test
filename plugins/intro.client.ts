// // plugins/intro.client.ts
// import introJs from 'intro.js'
// import 'intro.js/minified/introjs.min.css'

// export default defineNuxtPlugin((nuxtApp) => {
//   return {
//     provide: {
//       introJs: () => introJs()
//     }
//   }
// })

// plugins/intro.client.ts
import introJs from 'intro.js'
import 'intro.js/minified/introjs.min.css'

// Add custom CSS for tooltip width
const customStyles = `
.introjs-tooltip {
  min-width: 400px !important;  /* Set minimum width */
  max-width: 500px !important;  /* Set maximum width */
}

/* Make it responsive for mobile devices */
@media (max-width: 480px) {
  .introjs-tooltip {
    min-width: 280px !important;
    max-width: 90% !important;
  }
}
`

export default defineNuxtPlugin((nuxtApp) => {
  // Add custom styles to the document
  if (process.client) {
    const styleElement = document.createElement('style')
    styleElement.textContent = customStyles
    document.head.appendChild(styleElement)
  }

  return {
    provide: {
      introJs: () => introJs()
    }
  }
})