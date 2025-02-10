import React from 'react'
import Feed from './feed/page'

export const metadata = {
  title: "Feed",
  description: "Feed page for the showing posts",
};

export default async function Home() {
  return (
    <div>
      <Feed />
    </div>
  )
}

