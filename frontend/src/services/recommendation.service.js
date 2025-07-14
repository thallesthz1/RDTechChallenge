const getRecommendations = (formData, products) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = '',
  } = formData

  const matchedProducts = products.map(product => {
    const preferenceMatches = product.preferences.filter(p =>
      selectedPreferences.includes(p)
    ).length

    const featureMatches = product.features.filter(f =>
      selectedFeatures.includes(f)
    ).length

    const totalMatches = preferenceMatches + featureMatches

    return {
      ...product,
      totalMatches,
    }
  })

  if (selectedRecommendationType === 'SingleProduct') {
    const bestMatch = matchedProducts.reduce((acc, curr) => {
      if (curr.totalMatches >= (acc?.totalMatches || 0)) {
        return curr
      }
      return acc
    }, null)

    return bestMatch && bestMatch.totalMatches > 0 ? [bestMatch] : []
  }

  return matchedProducts.filter(p => p.totalMatches > 0)
}

export default { getRecommendations }
