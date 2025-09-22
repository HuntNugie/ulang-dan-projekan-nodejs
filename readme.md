# Node js
node js merupakan runtime environment yaitu tempat untuk menjalankan/mengeksekusi kode javascript di luar konteks browser oleh karna itu kita tidak bisa menggunakna DOM atau object atau method untuk memanipulasi DOM di browser, konteks nya sudah menjadi konteks laptop/system operasi kita
<br>
Node js juga memiliki sifat yang sama dengan javascript yaitu single thread dan asynchronus non blocking karna di dalam node js terdapat mesin v8

# Menjalankan Node js
kita dapat menjalankan node dengan Menggunakan terminal yang sudah terinstall node dimana kita hanya perlu menggunakan kata kunci node <b>namaFile.js</b> untuk menjalankan file javascript dengan node js

# Node REPL
node repl mirip seperti interactive shell adalah tempat dimana kita dapat menguji codingan javascript kita sebelum di jalankan di file javascript kita 
R -> Read(Membaca file javascript)
E -> Eval(mengevaluasi kode javascript)
P -> Print(Menampilkan ouput kode javascript)
L -> Looping(Mengulang program kembali ke eval)

# Module system
module bisa berupa 1 file code atau 1 folder yang berisi banyak file code javascript yang saling berhuubungan untuk menyelesaikan 1 masalah.
<br>
<b>Ada beberapa macam Module</b>
1. core module
2. local module
3. third party module

## Cara mengimport module 
- require(namaModule) -> cara lama untuk mengimport module javascript mau local, ataupun third party module
- import namaMethod/namaProperty/* from namaModule -> cara terbaru ESM untuk mengimport menggantikan cara lama

## Local Module
local module merupakan module yang di buat oleh kita sendiri dan ada cara sendiri untuk mengimport local module yaitu menggunakan "./" atau "../" saat memanggil local module nya
