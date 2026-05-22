<template>
  <div
    class="min-h-screen bg-[#f5f7fb] text-slate-900 flex items-center justify-center"
  >
    <!-- Hero -->
    <main class="max-w-7xl mx-auto px-6 pb-16">
      <section
        class="relative overflow-hidden rounded-[40px] border border-white/50 bg-white/50 backdrop-blur-2xl shadow-2xl p-10 md:p-16"
      >
        <!-- Blur Decoration -->
        <div
          class="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
        ></div>

        <div
          class="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"
        ></div>

        <div class="relative grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left -->
          <div>
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6"
            >
              Hello World
            </div>

            <h2
              class="text-5xl md:text-6xl font-black leading-tight text-slate-900"
            >
              Digital Bisnis
            </h2>

            <p class="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              Website awal untuk setup domain, hosting, dan pengembangan landing
              page modern menggunakan Vue, Vite, dan Tailwind CSS.
            </p>

            <!-- Buttons -->
            <div class="flex flex-wrap gap-4 mt-10">
              <button
                class="bg-blue-700 hover:bg-blue-800 transition text-white px-6 py-4 rounded-2xl font-semibold shadow-lg"
              >
                Setup Selesai
              </button>

              <button
                class="bg-white/70 backdrop-blur-xl border border-slate-200 hover:bg-white transition px-6 py-4 rounded-2xl font-semibold"
              >
                Vue + Tailwind
              </button>
            </div>

            <!-- Info -->
            <div class="flex flex-wrap gap-6 mt-10 text-sm text-slate-500">
              <span>✓ Domain Aktif</span>
              <span>✓ Hosting Aktif</span>
              <span>✓ Deploy Berhasil</span>
            </div>
          </div>

          <!-- Right -->
          <div class="relative">
            <div
              class="backdrop-blur-2xl bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[32px] p-8 shadow-2xl border border-white/20"
            >
              <div class="space-y-5">
                <div
                  class="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-xl"
                >
                  <p class="text-lg text-blue-100">23.11.5702</p>
                  <h3 class="text-xl font-bold text-white">
                    Rifki Bayu Ariyanto
                  </h3>
                </div>

                <div
                  class="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-xl"
                >
                  <p class="text-lg text-blue-100">23.11.5729</p>
                  <h3 class="text-xl font-bold text-white">Zerick Syahputra</h3>
                </div>

                <div
                  class="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-xl"
                >
                  <p class="text-lg text-blue-100">23.11.5739</p>
                  <h3 class="text-xl font-bold text-white">
                    Arya Andrean Pratama
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
