import React from "react"

import { base, wrapper, loadingBox, xcss } from "./primitives"

export default function Loading() {
  return (
    <div className={wrapper}>
      <div className={xcss(base, (theme) => ({ padding: theme.space["@2"] }))}>
        <div
          className={xcss(loadingBox, (theme) => ({
            width: 80,
            marginBottom: theme.space["@2"],
          }))}
        />
        <div className={xcss(loadingBox, { width: 200 })} />
      </div>
      <div className={xcss(loadingBox, { borderRadius: 0, height: 380 })} />

      <div className={xcss(base, (theme) => ({ padding: theme.space["@2"] }))}>
        <div
          className={xcss(loadingBox, (theme) => ({
            width: 80,
            marginBottom: theme.space["@2"],
          }))}
        />
        <div
          className={xcss(loadingBox, (theme) => ({
            marginBottom: theme.space["@2"],
          }))}
        />
        <div className={xcss(loadingBox)} />
      </div>

      <div
        className={xcss(base, (theme) => ({
          paddingTop: theme.space["@2"],
          paddingBottom: theme.space["@2"],
          display: "flex",
        }))}
      >
        <div
          className={xcss(loadingBox, (theme) => ({
            marginBottom: "@2",
            marginLeft: theme.space["@2"],
            marginRight: theme.space["@2"],
            width: "100%",
          }))}
        />
        <div
          className={xcss(loadingBox, (theme) => ({
            marginBottom: "@2",
            marginLeft: theme.space["@2"],
            marginRight: theme.space["@2"],
            width: "100%",
          }))}
        />
      </div>
    </div>
  )
}
