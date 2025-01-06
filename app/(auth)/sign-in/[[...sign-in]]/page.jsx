import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    


<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://static.vecteezy.com/system/resources/previews/025/342/938/original/cute-cat-a-tricolor-cat-wearing-glasses-is-working-on-a-computer-vector.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
       

        <SignIn />
      </div>
    </main>
  </div>
</section>
  )
}