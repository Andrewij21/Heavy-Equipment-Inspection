"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Data untuk tabel Wheel, diekstrak dari gambar
const wheelScheduleData = [
  {
    MONDAY: "H57217",
    TUESDAY: "H57218",
    WEDNESDAY: "H57219",
    THURSDAY: "H57220",
    FRIDAY: "H57221",
    SATURDAY: "H57225",
    SUNDAY: "C577067",
  },
  {
    MONDAY: "C577068",
    TUESDAY: "C577069",
    WEDNESDAY: "C577070",
    THURSDAY: "C577071",
    FRIDAY: "C577072",
    SATURDAY: "H57222",
    SUNDAY: "H57226",
  },
  {
    MONDAY: "H57238",
    TUESDAY: "C577074",
    WEDNESDAY: "H57242",
    THURSDAY: "H57245",
    FRIDAY: "H57246",
    SATURDAY: "H57269",
    SUNDAY: "H57270",
  },
  {
    MONDAY: "C577073",
    TUESDAY: "H57224",
    WEDNESDAY: "H57243",
    THURSDAY: "C577076",
    FRIDAY: "C577084",
    SATURDAY: "C577085",
    SUNDAY: "C577088",
  },
  {
    MONDAY: "H57223",
    TUESDAY: "H57248",
    WEDNESDAY: "C577075",
    THURSDAY: "H57237",
    FRIDAY: "H57240",
    SATURDAY: "H57241",
    SUNDAY: "H57244",
  },
  {
    MONDAY: "H57247",
    TUESDAY: "H57287",
    WEDNESDAY: "H57236",
    THURSDAY: "H57266",
    FRIDAY: "H57268",
    SATURDAY: "H57271",
    SUNDAY: "H57292",
  },
  {
    MONDAY: "H57286",
    TUESDAY: "H57294",
    WEDNESDAY: "H57272",
    THURSDAY: "H57289",
    FRIDAY: "H57290",
    SATURDAY: "H57291",
    SUNDAY: "H57299",
  },
  {
    MONDAY: "H57293",
    TUESDAY: "H57301",
    WEDNESDAY: "H57288",
    THURSDAY: "H57296",
    FRIDAY: "H57297",
    SATURDAY: "H57298",
    SUNDAY: "H57305",
  },
  {
    MONDAY: "H57300",
    TUESDAY: "C577082",
    WEDNESDAY: "H57295",
    THURSDAY: "H57303",
    FRIDAY: "C577087",
    SATURDAY: "H57304",
    SUNDAY: "DA54867",
  },
  {
    MONDAY: "C577077",
    TUESDAY: "C577083",
    WEDNESDAY: "H57302",
    THURSDAY: "H57267",
    FRIDAY: "C577097",
    SATURDAY: "C577089",
    SUNDAY: "DA54868",
  },
  {
    MONDAY: "C577091",
    TUESDAY: "C577092",
    WEDNESDAY: "DA54860",
    THURSDAY: "C577086",
    FRIDAY: "C577101",
    SATURDAY: "C577098",
    SUNDAY: "DA54863",
  },
  {
    MONDAY: "C577102",
    TUESDAY: "C577090",
    WEDNESDAY: "DA54861",
    THURSDAY: "C577096",
    FRIDAY: "DA54212",
    SATURDAY: "C577100",
    SUNDAY: "DA54864",
  },
  {
    MONDAY: "DA54208",
    TUESDAY: "C577095",
    WEDNESDAY: "DA54862",
    THURSDAY: "C577099",
    FRIDAY: "DA54214",
    SATURDAY: "DA54206",
    SUNDAY: "DA54865",
  },
  {
    MONDAY: "DA54210",
    TUESDAY: "DA54209",
    WEDNESDAY: "DA54875",
    THURSDAY: "DA54211",
    FRIDAY: "DA54238",
    SATURDAY: "DA54213",
    SUNDAY: "DA54866",
  },
  {
    MONDAY: "DA54237",
    TUESDAY: "DA54241",
    WEDNESDAY: "DA54876",
    THURSDAY: "DA54873",
    FRIDAY: "DA54239",
    SATURDAY: "DA54207",
    SUNDAY: "DA54878",
  },
  {
    MONDAY: "DA54240",
    TUESDAY: "GS824",
    WEDNESDAY: "DA54877",
    THURSDAY: "DA54874",
    FRIDAY: "SV523",
    SATURDAY: "DA54215",
    SUNDAY: "SV522",
  },
  {
    MONDAY: "GS710",
    TUESDAY: "GS827",
    WEDNESDAY: "DA54879",
    THURSDAY: "SV522",
    FRIDAY: "SV524",
    SATURDAY: "GS827",
    SUNDAY: "GS828",
  },
  {
    MONDAY: "SV523",
    TUESDAY: "GS831",
    WEDNESDAY: "GS830",
    THURSDAY: "GS828",
    FRIDAY: "GS824",
    SATURDAY: "GS831",
    SUNDAY: "GS830",
  },
  {
    MONDAY: "SV524",
    TUESDAY: "",
    WEDNESDAY: "",
    THURSDAY: "",
    FRIDAY: "",
    SATURDAY: "GS710",
    SUNDAY: "",
  },
];

const trackScheduleData = [
  {
    MONDAY: "E51228",
    TUESDAY: "E53912",
    WEDNESDAY: "E53914",
    THURSDAY: "E2050PPA",
    FRIDAY: "E53913",
    SATURDAY: "E53916",
    SUNDAY: "E53917",
  },
  {
    MONDAY: "E51230",
    TUESDAY: "E51231",
    WEDNESDAY: "D5302",
    THURSDAY: "D5154",
    FRIDAY: "E5141",
    SATURDAY: "E52027",
    SUNDAY: "E52028",
  },
  {
    MONDAY: "D5145",
    TUESDAY: "D5152",
    WEDNESDAY: "D5153",
    THURSDAY: "D5143",
    FRIDAY: "D5144",
    SATURDAY: "E5142",
    SUNDAY: "E5143",
  },
  {
    MONDAY: "D5843",
    TUESDAY: "D5844",
    WEDNESDAY: "D5852",
    THURSDAY: "E5137",
    FRIDAY: "E5138",
    SATURDAY: "D5842",
    SUNDAY: "D5845",
  },
  {
    MONDAY: "E2184PPA",
    TUESDAY: "E5515",
    WEDNESDAY: "E5517",
    THURSDAY: "E5162",
    FRIDAY: "D5155",
    SATURDAY: "E2181PPA",
    SUNDAY: "E5516",
  },
  {
    MONDAY: "E5164",
    TUESDAY: "E5521",
    WEDNESDAY: "D5861",
    THURSDAY: "D5862",
    FRIDAY: "D5133",
    SATURDAY: "D5160",
    SUNDAY: "E5163",
  },
];
const supportScheduleData = [
  {
    MONDAY: "WA52521",
    TUESDAY: "CT2512PPA",
    WEDNESDAY: "FT52514",
    THURSDAY: "FT2547PPA",
    FRIDAY: "FT2548PPA",
    SATURDAY: "LT52503",
    SUNDAY: "WA52519",
  },
  {
    MONDAY: "FT52518",
    TUESDAY: "LT2531PPA",
    WEDNESDAY: "CT52504",
    THURSDAY: "WA52525",
    FRIDAY: "FT52522",
    SATURDAY: "FT52523",
    SUNDAY: "WA52533",
  },
  {
    MONDAY: "FT52516",
    TUESDAY: "WA52529",
    WEDNESDAY: "WT2547PPA",
    THURSDAY: "MF4232PPA",
    FRIDAY: "LT2529PPA",
    SATURDAY: "WA52523",
    SUNDAY: "LT52509",
  },
  {
    MONDAY: "WL526",
    TUESDAY: "GS523",
    WEDNESDAY: "FT52517",
    THURSDAY: "M54202",
    FRIDAY: "WA52524",
    SATURDAY: "CP530",
    SUNDAY: "CP532",
  },
  {
    MONDAY: "WL531",
    TUESDAY: "GS49PPA",
    WEDNESDAY: "TL5130",
    THURSDAY: "TH5DS02",
    FRIDAY: "CP531",
    SATURDAY: "CP525",
    SUNDAY: "TL5120",
  },
  {
    MONDAY: "TL5126",
    TUESDAY: "WL525",
    WEDNESDAY: "TL5132",
    THURSDAY: "CP526",
    FRIDAY: "GS572",
    SATURDAY: "TL5123",
    SUNDAY: "TL5128",
  },
  {
    MONDAY: "TL5127",
    TUESDAY: "WL527",
    WEDNESDAY: "TL5134",
    THURSDAY: "TL5122",
    FRIDAY: "TL5129",
    SATURDAY: "TL5125",
    SUNDAY: "TL5133",
  },
  {
    MONDAY: "TL5167",
    TUESDAY: "WL532",
    WEDNESDAY: "TL5168",
    THURSDAY: "TL5124",
    FRIDAY: "TL5136",
    SATURDAY: "TL5135",
    SUNDAY: "TL5131",
  },
  {
    MONDAY: "TL5121",
    TUESDAY: "WL534",
    WEDNESDAY: "GSDE11PPA",
    THURSDAY: "CP510",
    FRIDAY: "TL5169",
    SATURDAY: "TL5170",
    SUNDAY: "TL5137",
  },
  {
    MONDAY: "CP515",
    TUESDAY: "GS525",
    WEDNESDAY: "",
    THURSDAY: "",
    FRIDAY: "TL5171",
    SATURDAY: "",
    SUNDAY: "",
  },
];

// Komponen tabel yang bisa dipakai ulang
const ScheduleTable = ({ data, title }: { data: any[]; title: string }) => {
  // Kunci data tetap menggunakan Bahasa Inggris untuk mencocokkan objek data
  const headers = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  // Objek untuk menerjemahkan header ke Bahasa Indonesia
  const dayTranslations: { [key: string]: string } = {
    MONDAY: "SENIN",
    TUESDAY: "SELASA",
    WEDNESDAY: "RABU",
    THURSDAY: "KAMIS",
    FRIDAY: "JUMAT",
    SATURDAY: "SABTU",
    SUNDAY: "MINGGU",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((day) => (
                  <TableHead key={day} className="font-bold text-center">
                    {/* Tampilkan nama hari yang sudah diterjemahkan */}
                    {dayTranslations[day]}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((day) => (
                    <TableCell
                      key={`${rowIndex}-${day}`}
                      className="text-center"
                    >
                      {row[day] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Komponen Halaman Utama
export default function SchedulePage() {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Jadwal Inspeksi</h1>
        <p className="mt-1 text-sm text-gray-600">
          Jadwal inspeksi harian untuk semua jenis peralatan.
        </p>
      </div>

      <Tabs defaultValue="track" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="track">Track</TabsTrigger>
          <TabsTrigger value="wheel">Wheel</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        <TabsContent value="track" className="mt-6">
          <ScheduleTable
            data={trackScheduleData}
            title="Jadwal Peralatan Track"
          />
        </TabsContent>
        <TabsContent value="wheel" className="mt-6">
          <ScheduleTable
            data={wheelScheduleData}
            title="Jadwal Peralatan Wheel"
          />
        </TabsContent>
        <TabsContent value="support" className="mt-6">
          <ScheduleTable
            data={supportScheduleData}
            title="Jadwal Peralatan Support"
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
