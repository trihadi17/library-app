--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: buku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buku (
    id integer NOT NULL,
    judul character varying NOT NULL,
    pengarang character varying NOT NULL,
    penerbit character varying NOT NULL,
    tahun_terbit character varying NOT NULL,
    deskripsi text NOT NULL,
    rak_id integer DEFAULT 0,
    stok integer NOT NULL
);


ALTER TABLE public.buku OWNER TO postgres;

--
-- Name: buku_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.buku_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.buku_id_seq OWNER TO postgres;

--
-- Name: buku_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.buku_id_seq OWNED BY public.buku.id;


--
-- Name: history_peminjaman; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.history_peminjaman (
    id integer NOT NULL,
    nim character varying NOT NULL,
    nama character varying NOT NULL,
    buku_id integer NOT NULL,
    buku character varying NOT NULL,
    tanggal_peminjaman date NOT NULL,
    tanggal_kembali date NOT NULL
);


ALTER TABLE public.history_peminjaman OWNER TO postgres;

--
-- Name: history_peminjaman_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.history_peminjaman_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.history_peminjaman_id_seq OWNER TO postgres;

--
-- Name: history_peminjaman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.history_peminjaman_id_seq OWNED BY public.history_peminjaman.id;


--
-- Name: mahasiswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mahasiswa (
    id integer NOT NULL,
    nim character varying NOT NULL,
    nama character varying NOT NULL,
    nohp character varying NOT NULL,
    alamat text NOT NULL,
    status_mahasiswa character varying NOT NULL
);


ALTER TABLE public.mahasiswa OWNER TO postgres;

--
-- Name: mahasiswa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mahasiswa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mahasiswa_id_seq OWNER TO postgres;

--
-- Name: mahasiswa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mahasiswa_id_seq OWNED BY public.mahasiswa.id;


--
-- Name: rak; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rak (
    id integer NOT NULL,
    nama_rak character varying NOT NULL,
    deskripsi text NOT NULL
);


ALTER TABLE public.rak OWNER TO postgres;

--
-- Name: rak_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rak_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rak_id_seq OWNER TO postgres;

--
-- Name: rak_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rak_id_seq OWNED BY public.rak.id;


--
-- Name: transaksi_peminjaman; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaksi_peminjaman (
    id integer NOT NULL,
    nim character varying NOT NULL,
    buku_id integer NOT NULL,
    status character varying NOT NULL,
    tanggal_peminjaman date NOT NULL,
    batas_tanggal_pinjam date NOT NULL,
    tanggal_perpanjang date,
    tanggal_kembali date
);


ALTER TABLE public.transaksi_peminjaman OWNER TO postgres;

--
-- Name: transaksi_peminjaman_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaksi_peminjaman_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaksi_peminjaman_id_seq OWNER TO postgres;

--
-- Name: transaksi_peminjaman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaksi_peminjaman_id_seq OWNED BY public.transaksi_peminjaman.id;


--
-- Name: buku id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buku ALTER COLUMN id SET DEFAULT nextval('public.buku_id_seq'::regclass);


--
-- Name: history_peminjaman id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_peminjaman ALTER COLUMN id SET DEFAULT nextval('public.history_peminjaman_id_seq'::regclass);


--
-- Name: mahasiswa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mahasiswa ALTER COLUMN id SET DEFAULT nextval('public.mahasiswa_id_seq'::regclass);


--
-- Name: rak id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rak ALTER COLUMN id SET DEFAULT nextval('public.rak_id_seq'::regclass);


--
-- Name: transaksi_peminjaman id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman ALTER COLUMN id SET DEFAULT nextval('public.transaksi_peminjaman_id_seq'::regclass);


--
-- Data for Name: buku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buku (id, judul, pengarang, penerbit, tahun_terbit, deskripsi, rak_id, stok) FROM stdin;
3	Bandung Lautan Api	Andri Kuswan	Republik Indonesia	1998	Ini adalah buku tentang sejarah bandung lautan api	0	49
1	Sistem Informasi Manajemen Konferensi Ilmiah	Trihadi Putra	App Conferencel	2022	Ini adalah buku tentang sistem manajemen konferensi	1	49
4	Mari Bergambar	Oni Santri	Kanakku	2010	Ini adalah buku tentang menggambar	3	49
2	Sistem Informasi Pengajuan Cuti dan Izin Pegawai	Trihadi Putra	Dinas Sosial	2019	Ini adalah buku tentang sistem pengajuan cuti dan izin	0	49
\.


--
-- Data for Name: history_peminjaman; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.history_peminjaman (id, nim, nama, buku_id, buku, tanggal_peminjaman, tanggal_kembali) FROM stdin;
\.


--
-- Data for Name: mahasiswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mahasiswa (id, nim, nama, nohp, alamat, status_mahasiswa) FROM stdin;
1	11651100257	Trihadi Putra	0895603075970	Jl Serayu Gg Serayu II, Pekanbaru	Aktif
2	11651100258	Indro Kustiawan	0812345678865	Jl Jakarta	Tidak Aktif
3	11651100259	Irfaan Luqman Adi	082354949494	Jl Pisang	Aktif
\.


--
-- Data for Name: rak; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rak (id, nama_rak, deskripsi) FROM stdin;
1	Teknologi Informasi	Ini adalah rak teknologi informasi
2	Astronomi	Ini adalah rak astronomi
3	Anak-Anak	Ini adalah rak anak-anak
\.


--
-- Data for Name: transaksi_peminjaman; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaksi_peminjaman (id, nim, buku_id, status, tanggal_peminjaman, batas_tanggal_pinjam, tanggal_perpanjang, tanggal_kembali) FROM stdin;
1	11651100257	3	Dipinjam	2024-04-07	2024-04-21	\N	\N
2	11651100257	1	Dipinjam	2024-04-07	2024-04-21	\N	\N
3	11651100257	4	Dipinjam	2024-04-07	2024-04-21	\N	\N
4	11651100257	2	Dipinjam	2024-04-07	2024-04-21	\N	\N
\.


--
-- Name: buku_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.buku_id_seq', 4, true);


--
-- Name: history_peminjaman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.history_peminjaman_id_seq', 1, false);


--
-- Name: mahasiswa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mahasiswa_id_seq', 3, true);


--
-- Name: rak_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rak_id_seq', 3, true);


--
-- Name: transaksi_peminjaman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaksi_peminjaman_id_seq', 4, true);


--
-- Name: buku buku_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY (id);


--
-- Name: history_peminjaman history_peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_peminjaman
    ADD CONSTRAINT history_peminjaman_pkey PRIMARY KEY (id);


--
-- Name: mahasiswa mahasiswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mahasiswa
    ADD CONSTRAINT mahasiswa_pkey PRIMARY KEY (id);


--
-- Name: rak rak_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rak
    ADD CONSTRAINT rak_pkey PRIMARY KEY (id);


--
-- Name: transaksi_peminjaman transaksi_peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman
    ADD CONSTRAINT transaksi_peminjaman_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

