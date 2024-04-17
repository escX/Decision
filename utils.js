function getIFISExcludePropIndex(data, index) {
  return data.map(item => ({
    object: item.object,
    props: item.props.filter((_, i) => i !== index)
  }))
}

module.exports = {
  getIFISExcludePropIndex,
}
