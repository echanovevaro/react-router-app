import React from "react"
import MainNavigation from "../components/MainNavigation"
import { Outlet } from "react-router-dom"

function Root() {
  // const navigation = useNavigation()
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && (
          <main>
            <p>Loading...</p>
          </main>
        )} */}

        <Outlet />
      </main>
    </>
  )
}

export default Root
