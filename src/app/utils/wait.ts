export const wait = async (time = 1200) => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), time)
    })
  }