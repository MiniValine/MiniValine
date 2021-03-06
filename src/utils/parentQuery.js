import dom from './plugins/dom'
const parentQuery = (root) => {
  let num = 1
  root.TotalPages = 0
  root.parentQuery = (pageNum = 1) => {
    root.loading.show()
    root.pageNum = pageNum
    root.fetchParentList(root, pageNum)
  }
  root.fetchParentListWS = (rets) => {
    // console.log(rets)
    const len = rets.length
    if (len) {
      for (let i = 0; i < len; i++) {
        if (i == 0) {
          root.loading.hide(root.TotalPages)
        }
        const parentVcard = root.insertComment(
          rets[i],
          root.el.querySelector('.vlist'),
          false
        )
        parentVcard.setAttribute('style', 'margin-bottom: .5em')
        root.nestQuery(parentVcard)
      }
      const vpage = root.el.querySelector('.vpage')
      vpage.innerHTML = root.pageNum < root.TotalPages
        ? `<div id="vmore" class="more">${root.i18n.more}</div>`
        : ''
      const vmore = vpage.querySelector('#vmore')
      if (vmore) {
        dom.on('click', vmore, (e) => {
          vpage.innerHTML = ''
          root.parentQuery(++num)
        })
      }
    }
    typeof root.conf.PageLoaded === 'function' && root.conf.PageLoaded()
    root.loading.hide(root.TotalPages)
  }
}
module.exports = parentQuery
