/**
 * KATAKULLİ — Oyuncu ve Yapım Ekibi verileri
 *
 * Yeni bir kişi eklemek için ilgili diziye yeni bir nesne ekleyin.
 * `slug` alanı URL'de kullanılır:  /oyuncular/<slug>  veya  /ekip/<slug>
 * Fotoğrafı değiştirmek için src/assets içine yeni görsel koyup import edin.
 */
import p1 from "@/assets/portrait-1.jpg";
import p2 from "@/assets/portrait-2.jpg";
import p3 from "@/assets/portrait-3.jpg";
import p4 from "@/assets/portrait-4.jpg";
import p5 from "@/assets/portrait-5.jpg";
import p6 from "@/assets/portrait-6.jpg";

export type Social = {
  platform: "instagram" | "youtube" | "x" | "web";
  url: string;
};

export type Person = {
  slug: string;
  name: string;
  /** Oyuncular için karakter adı, ekip için görev */
  role: string;
  photo?: string;
  short: string;
  bio: string[];
  education: string[];
  stage: string[];
  other: string[];
  katakulli: string;
  socials: Social[];
};

export const SITE = {
  name: "KATAKULLİ",
  company: "Sarıyer Belediyesi Tiyatrosu",
  year: 2026,
  socials: [{ platform: "instagram", url: "https://www.instagram.com/katakulli.sbt/" }] as Social[],
};

export const cast: Person[] = [
  {
    slug: "ahmet-yilmaz",
    name: "Ahmet Yılmaz",
    role: "Hacivat",
    photo: p1,
    short: "Kelime oyunlarının ustası, sahnenin aklı.",
    bio: [
      "1978 yılında İstanbul'da doğdu. Tiyatroyla ilk tanışması lise yıllarında okul sahnesinde oldu; o günden bu yana sahneden hiç inmedi.",
      "Yirmi yılı aşkın kariyerinde klasik ve çağdaş pek çok yapımda rol aldı. Özellikle geleneksel Türk tiyatrosu formlarını modern sahne diliyle buluşturan çalışmalarıyla tanınır.",
    ],
    education: [
      "İstanbul Üniversitesi Devlet Konservatuvarı — Tiyatro Bölümü",
      "Müjdat Gezen Sanat Merkezi — Oyunculuk Atölyesi",
    ],
    stage: ["Kanlı Nigar", "Keşanlı Ali Destanı", "Bir Delinin Hatıra Defteri", "Cimri", "Hisse-i Şayia"],
    other: ["Yalnız Kurt (dizi)", "Son Perde (kısa film)", "Radyo Tiyatrosu — TRT"],
    katakulli:
      "Katakulli'de Hacivat karakteriyle sahnede. Aklı ve dili her şeyin üstünde tutan, planları çoğu zaman ters tepen ama asla pes etmeyen bir figürü sıcacık bir mizahla canlandırıyor.",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
  },
  {
    slug: "ayse-demir",
    name: "Ayşe Demir",
    role: "Zenne",
    photo: p2,
    short: "Sahneyi bir bakışla dolduran güçlü bir varlık.",
    bio: [
      "Ankara doğumlu. Konservatuvar eğitiminin ardından İstanbul'a yerleşti ve özel tiyatrolarda kısa sürede dikkat çeken bir kariyer inşa etti.",
      "Fiziksel tiyatro ve müzikli oyunlardaki deneyimi, Katakulli'nin ritmik ve enerjik sahne diline önemli katkı sağlıyor.",
    ],
    education: ["Hacettepe Üniversitesi Devlet Konservatuvarı — Oyunculuk"],
    stage: ["Kösem Sultan", "Ferhat ile Şirin", "Lüküs Hayat", "Zengin Mutfağı"],
    other: ["Mahalle (dizi)", "Perdenin Ardı (belgesel — anlatıcı)"],
    katakulli:
      "Zenne rolünde; oyunun tüm entrikalarının ortasında duran, herkesi parmağında oynatan ve seyirciyi kendine hayran bırakan karakteri canlandırıyor.",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
  },
  {
    slug: "mehmet-kaya",
    name: "Mehmet Kaya",
    role: "Karagöz",
    photo: p3,
    short: "Kaba saba ama altın kalpli halk kahramanı.",
    bio: [
      "1996 doğumlu genç oyuncu, üniversite yıllarında amatör topluluklarla başladığı yolculuğuna profesyonel sahnede devam ediyor.",
      "Doğaçlama ve komedi alanındaki yeteneğiyle Katakulli kadrosunun en enerjik isimlerinden biri.",
    ],
    education: ["Mimar Sinan Güzel Sanatlar Üniversitesi — Tiyatro Bölümü"],
    stage: ["Kabare Katakulli", "Sersem Kocanın Kurnaz Karısı", "Hamlet"],
    other: ["Gençlik (kısa film)", "Reklam filmleri"],
    katakulli:
      "Karagöz karakteriyle sahnede; doğrudan, patavatsız ve her şeye rağmen sevilen halk adamını yepyeni bir enerjiyle yorumluyor.",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
  },
  {
    slug: "fatma-sahin",
    name: "Fatma Şahin",
    role: "Kaynana",
    photo: p4,
    short: "Kırk yıllık sahne tecrübesi, bir bakışta anlam.",
    bio: [
      "Türk tiyatrosunun duayen isimlerinden. 1980'lerden bu yana devlet ve şehir tiyatrolarında sayısız yapımda yer aldı.",
      "Genç kuşaklara oyunculuk eğitimi vermeye devam ediyor.",
    ],
    education: ["Ankara Devlet Konservatuvarı — Tiyatro Yüksek Bölümü"],
    stage: ["Kral Lear", "Üç Kız Kardeş", "Cadı Kazanı", "Yaşar Ne Yaşar Ne Yaşamaz"],
    other: ["Aile Bağları (dizi)", "Anne (sinema)"],
    katakulli:
      "Kaynana rolünde; tek bir kaş hareketiyle sahnenin dengesini değiştiren, mizahı zamanlamayla kuran bir usta performansı.",
    socials: [],
  },
  {
    slug: "can-ozturk",
    name: "Can Öztürk",
    role: "Tuzsuz Deli Bekir",
    photo: p5,
    short: "Gürültülü, korkutucu ve komik.",
    bio: [
      "Bursa doğumlu. Konservatuvar sonrası uzun yıllar İzmir'de sahne aldı, ardından İstanbul'a taşındı.",
      "Karakter oyunculuğundaki derinliğiyle bilinir.",
    ],
    education: ["Dokuz Eylül Üniversitesi — Sahne Sanatları"],
    stage: ["Godot'yu Beklerken", "Vişne Bahçesi", "Tartuffe"],
    other: ["Kuzey Yıldızı (dizi)"],
    katakulli:
      "Tuzsuz Deli Bekir olarak; sahneye her girişinde ortalığı karıştıran, herkesi korkutan ama kendisi en çok korkan kabadayıyı canlandırıyor.",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
  },
  {
    slug: "elif-arslan",
    name: "Elif Arslan",
    role: "Çelebi",
    photo: p6,
    short: "Zarif, hayalperest ve daima âşık.",
    bio: [
      "2000 doğumlu. Konservatuvarı yeni bitirmiş olmasına rağmen kısa sürede öne çıkan yeteneklerden.",
      "Katakulli ilk büyük profesyonel prodüksiyonu.",
    ],
    education: ["İstanbul Üniversitesi Devlet Konservatuvarı — Tiyatro"],
    stage: ["Romeo ve Juliet (okul yapımı)", "Küçük Prens"],
    other: ["Bahar (kısa film)"],
    katakulli:
      "Çelebi rolünde; oyunun romantik ve naif kalbini temsil eden, şiirle konuşan genç âşığı canlandırıyor.",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
  },
];

export const crew: Person[] = [
  {
    slug: "yonetmen",
    name: "Kemal Aydın",
    role: "Yönetmen",
    photo: p5,
    short: "Geleneği bugünün sahnesine taşıyan bir vizyon.",
    bio: [
      "Otuz yıllık sahne deneyimine sahip yönetmen. Geleneksel Türk tiyatrosu üzerine yaptığı çalışmalarla tanınıyor.",
      "Katakulli, Karagöz–Hacivat ve orta oyunu geleneğini çağdaş bir kabare diliyle yeniden yorumlama fikrinden doğdu.",
    ],
    education: ["Ankara Üniversitesi DTCF — Tiyatro Bölümü", "Yüksek Lisans — Sahne Yönetimi"],
    stage: ["Keşanlı Ali Destanı", "Hürrem Sultan", "Kanlı Nigar", "Bir Yaz Gecesi Rüyası"],
    other: ["Sahnenin Arkası (kitap)", "Tiyatro Festivali Küratörlüğü"],
    katakulli:
      "Katakulli'nin yönetmeni ve fikir babası. Oyunun dramaturjisinden sahne diline kadar tüm yaratıcı süreci yönetiyor.",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
  },
  {
    slug: "yonetmen-yardimcisi",
    name: "Selin Koç",
    role: "Yönetmen Yardımcısı",
    photo: p6,
    short: "Provaların görünmez kahramanı.",
    bio: ["Genç kuşak yönetmenlerden. Birçok bağımsız yapımda yönetmen yardımcısı ve reji asistanı olarak çalıştı."],
    education: ["Kadir Has Üniversitesi — Tiyatro"],
    stage: ["Kral Übü", "Antigone"],
    other: [],
    katakulli: "Prova sürecinin koordinasyonu ve sahne planlarının uygulanmasından sorumlu.",
    socials: [],
  },
  {
    slug: "dramaturg",
    name: "Deniz Yıldız",
    role: "Dramaturg",
    photo: p2,
    short: "Metnin derinliğini sahneye taşıyor.",
    bio: ["Edebiyat ve tiyatro kuramı üzerine akademik çalışmaları bulunan dramaturg."],
    education: ["Boğaziçi Üniversitesi — Türk Dili ve Edebiyatı", "Doktora — Tiyatro Eleştirmenliği"],
    stage: ["Faust", "Nora", "Kanlı Nigar"],
    other: ["Geleneksel Tiyatro ve Modernite (makaleler)"],
    katakulli: "Katakulli metninin geleneksel kaynaklarla çağdaş mizah arasındaki köprüsünü kurdu.",
    socials: [],
  },
  {
    slug: "sahne-tasarimi",
    name: "Murat Çelik",
    role: "Sahne Tasarımı",
    photo: p1,
    short: "Boş sahneden büyülü mekâna.",
    bio: ["Mimarlık kökenli sahne tasarımcısı. Minimal ama güçlü mekân kurgularıyla tanınır."],
    education: ["İTÜ — Mimarlık", "Yıldız Teknik — Sahne Tasarımı"],
    stage: ["Cimri", "Üç Kuruşluk Opera"],
    other: ["Sergi tasarımları"],
    katakulli: "Perde, fes ve gölge motiflerinden ilham alan modüler sahne tasarımını yarattı.",
    socials: [{ platform: "web", url: "https://example.com" }],
  },
  {
    slug: "isik-tasarimi",
    name: "Zeynep Acar",
    role: "Işık Tasarımı",
    photo: p2,
    short: "Işıkla hikâye anlatıyor.",
    bio: ["Ulusal ve uluslararası festivallerde ışık tasarımı yapan deneyimli tasarımcı."],
    education: ["Anadolu Üniversitesi — Sahne Işığı"],
    stage: ["Hamlet", "Godot'yu Beklerken", "Lüküs Hayat"],
    other: ["Konser ışık tasarımları"],
    katakulli: "Geleneksel gölge oyununun ışık diliyle modern spot estetiğini harmanladı.",
    socials: [],
  },
  {
    slug: "ses-tasarimi",
    name: "Barış Erdoğan",
    role: "Ses Tasarımı",
    photo: p3,
    short: "Her sesin bir anlamı var.",
    bio: ["Ses mühendisi ve tasarımcı. Tiyatro, sinema ve podcast prodüksiyonlarında çalışıyor."],
    education: ["Bilgi Üniversitesi — Ses Tasarımı"],
    stage: ["Sersem Kocanın Kurnaz Karısı", "Kabare"],
    other: ["Kısa film ses tasarımları"],
    katakulli: "Oyunun ses atmosferini ve efekt tasarımını gerçekleştirdi.",
    socials: [],
  },
  {
    slug: "kostum-tasarimi",
    name: "Nur Kaplan",
    role: "Kostüm Tasarımı",
    photo: p4,
    short: "Fesi yeniden hayal etti.",
    bio: ["Moda tasarımı kökenli kostüm tasarımcısı. Geleneksel kıyafetleri çağdaş kesimlerle yeniden yorumluyor."],
    education: ["Marmara Üniversitesi — Tekstil ve Moda Tasarımı"],
    stage: ["Kösem Sultan", "Ferhat ile Şirin"],
    other: ["Moda haftası koleksiyonları"],
    katakulli: "Katakulli'nin simgesi olan fes başta olmak üzere tüm kostümleri tasarladı.",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
  },
  {
    slug: "muzik",
    name: "Emre Doğan",
    role: "Müzik",
    photo: p5,
    short: "Sahnenin nabzı.",
    bio: ["Besteci ve müzisyen. Türk makam müziğini elektronik dokularla buluşturan çalışmalarıyla tanınıyor."],
    education: ["İTÜ Türk Musikisi Devlet Konservatuvarı"],
    stage: ["Keşanlı Ali Destanı", "Hürrem Sultan"],
    other: ["Albümler", "Film müzikleri"],
    katakulli: "Oyunun özgün müziklerini besteledi ve canlı müzik düzenlemesini yaptı.",
    socials: [{ platform: "youtube", url: "https://youtube.com/" }],
  },
  {
    slug: "koreografi",
    name: "İpek Yaman",
    role: "Koreografi",
    photo: p6,
    short: "Hareketle mizah.",
    bio: ["Dansçı ve koreograf. Modern dans ile halk oyunlarını bir araya getiren sahne çalışmaları yapıyor."],
    education: ["MSGSÜ — Çağdaş Dans"],
    stage: ["Lüküs Hayat", "Zengin Mutfağı"],
    other: ["Dans festivalleri"],
    katakulli: "Oyunun tüm hareket ve dans düzenlemelerini tasarladı.",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
  },
  {
    slug: "afis-grafik-tasarim",
    name: "Cem Polat",
    role: "Afiş / Grafik Tasarım",
    photo: p3,
    short: "Görsel kimliğin mimarı.",
    bio: ["Grafik tasarımcı ve illüstratör. Kültür-sanat kurumları için görsel kimlik çalışmaları yapıyor."],
    education: ["Marmara Üniversitesi — Grafik Tasarım"],
    stage: [],
    other: ["Festival afişleri", "Kitap kapakları"],
    katakulli: "Katakulli'nin afişini, logosunu ve tüm görsel kimliğini tasarladı.",
    socials: [{ platform: "web", url: "https://example.com" }],
  },
  {
    slug: "sahne-amiri",
    name: "Hakan Güneş",
    role: "Sahne Amiri",
    photo: p1,
    short: "Perde arkasında her şey yolunda.",
    bio: ["Yirmi yıllık deneyime sahip sahne amiri. Yüzlerce temsilde perde arkasını yönetti."],
    education: ["Sahne Teknolojileri Sertifika Programı"],
    stage: ["Şehir Tiyatroları — çeşitli yapımlar"],
    other: [],
    katakulli: "Temsil akışının ve sahne arkasının sorunsuz ilerlemesinden sorumlu.",
    socials: [],
  },
  {
    slug: "teknik-ekip",
    name: "Teknik Ekip",
    role: "Teknik Ekip",
    short: "Işık, ses ve sahne teknisyenleri.",
    bio: ["Katakulli'nin her temsilinde ışık, ses ve sahne değişimlerini gerçekleştiren teknik kadro."],
    education: [],
    stage: [],
    other: [],
    katakulli: "Işık ve ses masalarının operasyonu, dekor değişimleri ve sahne güvenliği.",
    socials: [],
  },
  {
    slug: "yapim-koordinasyonu",
    name: "Gizem Ateş",
    role: "Yapım Koordinasyonu",
    photo: p2,
    short: "Her detayı bir araya getiren isim.",
    bio: ["Kültür-sanat prodüksiyon yöneticisi. Festival ve tiyatro yapımlarında koordinasyon deneyimine sahip."],
    education: ["İstanbul Bilgi Üniversitesi — Sanat ve Kültür Yönetimi"],
    stage: [],
    other: ["Festival yönetimi"],
    katakulli: "Yapımın bütçe, takvim ve kurumsal iletişim süreçlerini yönetiyor.",
    socials: [],
  },
];

export const findCast = (slug: string) => cast.find((p) => p.slug === slug);
export const findCrew = (slug: string) => crew.find((p) => p.slug === slug);
