import * as core from "../Template/core"
import * as shared from "../Template/shared"

// TODO CREATE SEARCH METADATA FUNCTION

core.log(core.searchMetadata({searched: "reincarnated", page: 1}))

core.search([
    core.viewsHolder({
        views : [
            core.view({
                title : "hello"
            }),
             core.view({
                title : "hello"
            }),
             core.view({
                title : "hello"
            })
        ]
    })
])