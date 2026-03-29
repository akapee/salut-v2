import { FaUser as User, FaUserGraduate as GraduationCap } from "react-icons/fa6";

export default function Stats() {
  return (
    <section className="relative w-full bg-white overflow-hidden  pt-10">
      {/* Dashed Grid Background using SVG */}
      <div className="absolute inset-0 pointer-events-none text-gray-400 opacity-30 flex justify-center items-center">

      </div>

      {/* The main content area */}
      <div className="relative max-w-5xl mx-auto px-6 h-[500px] flex justify-center items-end">

        {/* Floating Left Badge */}
        <div className="absolute left-0 md:left-10 lg:left-24 top-24 z-20 animate-[bounce_6s_infinite]">
          <div className="relative bg-[#Fef5cc] px-6 py-4 rounded-xl shadow-lg border border-[#fceeab] min-w-[200px]">
            {/* Highlighting icon tab */}
            <div className="absolute -top-5 -left-4 bg-[#c2a818] text-white p-2.5 rounded-xl shadow-md">
              <User className="w-6 h-6" fill="currentColor" />
            </div>
            <div className="text-[#a48c0f] font-extrabold text-3xl mb-1 mt-3">
              500K++
            </div>
            <div className="text-gray-500 font-medium text-sm">
              Mahasiswa Aktif
            </div>
          </div>
        </div>

        {/* Floating Right Badge */}
        <div className="absolute right-0 md:right-10 lg:right-24 top-10 z-20 animate-[pulse_4s_infinite]">
          <div className="relative bg-[#eaf4fc] px-6 py-5 rounded-xl shadow-lg border border-[#dcecf9] min-w-[200px]">
            {/* Highlighting icon tab */}
            <div className="absolute -top-5 -left-4 bg-[#145fcb] text-white p-2.5 rounded-xl shadow-md">
              <GraduationCap className="w-6 h-6" fill="currentColor" />
            </div>
            <div className="text-[#145fcb] font-extrabold text-3xl mb-1 mt-2">
              30++
            </div>
            <div className="text-gray-500 font-medium text-sm">
              Program Studi
            </div>
          </div>
        </div>

        {/* Center Image */}
        <div className="relative z-10 w-[600px] md:w-[700px] lg:w-[800px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/student.png"
            alt="Mahasiswa"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
