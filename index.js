export const ensureJSON = (data, structure, end) => {
  let branch = data
  for (let x = 0; x < structure.length; x++) {
    if (x !== structure.length - 1) {
      if (branch[structure[x]] !== undefined) {
        if (branch[structure[x]] === null || typeof branch[structure[x]] !== "object" || Array.isArray(branch[structure[x]])) {
          throw Error("Incompatible JSON structure")
        }
      } else {
        branch[structure[x]] = {}
      }
    } else {
      if (branch[structure[x]] !== undefined && branch[structure[x]] !== null && (Array.isArray(end) ^ Array.isArray(branch[structure[x]]) || (end !== null && typeof end === "object") ^ typeof branch[structure[x]] === "object")) {
        throw Error("Incompatible JSON structure")
      } else if (branch[structure[x]] === undefined || typeof branch[structure[x]] !== "object") {
        branch[structure[x]] = end
      }
    }
    branch = branch[structure[x]]
  }
}

export const cleanJSON = (data) => {
  if (Array.isArray(data)) {
    for (const [i, item] of data.entries()) {
      if (typeof item === "object" && cleanJSON(item)) {
        data.splice(i, 1)
      }
    }
    return data.length === 0
  } else if (data !== null && typeof data === "object") {
    for (const [k, item] of Object.entries(data)) {
      if (typeof item === "object" && cleanJSON(item)) {
        delete data[k]
      }
    }
    return Object.keys(data).length === 0
  } else {
    return false
  }
}

export default {
  ensureJSON,
  cleanJSON
}