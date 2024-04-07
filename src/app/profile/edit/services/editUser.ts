export async function editUser(minDonate: number, pageText: string, initDataRaw: string = "") {
  return await fetch('/api/profile/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `tma ${initDataRaw}`
    },
    body: JSON.stringify({
      minDonate,
      description: pageText
    })
  });
}