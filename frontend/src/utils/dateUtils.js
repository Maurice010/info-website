export const formatDateTime = (iso) => {
  return new Date(iso).toLocaleString('pl-PL', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}