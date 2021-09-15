import {createApp} from './app.js'

const {app, store, router, App} = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        // 找到增量组件，拉取数据 
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        // 组件数据通过执行asyncData方法获取
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }
        // 要注意asyncData方法要返回promise，asyncData调用的vuex action也必须返回promise
        Promise.all(asyncDataHooks.map(hook => hook({
                store,
                route: to
            })))
            .then(() => {
                next()
            })
            .catch(next)
    })
    app.$mount('#app')
})
