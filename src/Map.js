import React from 'react'

const laptop = [
    {
        nama: 'Laptop Dell',
        harga: 3000000
    },

    {
        nama: 'Laptop Hp',
        harga: 2700000
    },

    {
        nama: 'Laptop Lenovo',
        harga: 3500000
    },

    {
        nama: 'Laptop Asus',
        harga: 2900000
    }
]

const total_bayar = laptop.reduce((total_harga, barang) => {
    return total_harga + barang.harga;
}, 0);

const Map = () => {
    return (
        <div>
            <h2>Map</h2>
            <ol>
                {laptop.map((barang) => (
                    <li>{barang.nama} - {barang.harga}</li>
                ))}
            </ol>

            <h2>Map Filter lebih dari 2900000</h2>

            <ol>
                {laptop
                    .filter((barang) => barang.harga > 2900000)
                    .map((barang) => (
                        <li>{barang.nama} - {barang.harga}</li>
                    )
                    )}
            </ol>

            <h3>Total Harga : {total_bayar}</h3>
        </div>

    )
}

export default Map
