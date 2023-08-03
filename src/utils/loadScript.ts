export const loadScript = (src: string, id: string) => {
  const script = document.createElement('script')
  script.id = id
  script.src = src
  document.head.appendChild(script)
}
