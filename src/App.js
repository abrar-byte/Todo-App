import { Component } from 'react'
import './App.css';

class Hasil extends Component {
  render() {
    return (
      <div>
        <div class="panel" >
          {this.props.hasil}
        </div>
      </div>
    )
  }
}

class NumberTambah extends Component {
  render() {
    return (
      <div>
        <button class="tombol" onClick={() => this.props.click(1)}>1</button>
        <button class="tombol" onClick={() => this.props.click(2)}>2</button>
        <button class="tombol" onClick={() => this.props.click(3)}>3</button><br />
        <button class="tombol" onClick={() => this.props.click(4)}>4</button>
        <button class="tombol" onClick={() => this.props.click(5)}>5</button>
        <button class="tombol" onClick={() => this.props.click(6)}>6</button><br />
        <button class="tombol" onClick={() => this.props.click(7)}>7</button>
        <button class="tombol" onClick={() => this.props.click(8)}>8</button>
        <button class="tombol" onClick={() => this.props.click(9)}>9</button><br />
        <button class="tombol" onClick={() => this.props.click('+')}>+</button>
        <button class="tombol" onClick={() => this.props.click(0)}>0</button>
        <button class="tombol" onClick={() => this.props.click('=')}>=</button>
      </div>)
  }
}
class NumberKurang extends Component {
  render() {
    return (
      <div>
        <button class="tombol" onClick={() => this.props.click(1)}>1</button>
        <button class="tombol" onClick={() => this.props.click(2)}>2</button>
        <button class="tombol" onClick={() => this.props.click(3)}>3</button><br />
        <button class="tombol" onClick={() => this.props.click(4)}>4</button>
        <button class="tombol" onClick={() => this.props.click(5)}>5</button>
        <button class="tombol" onClick={() => this.props.click(6)}>6</button><br />
        <button class="tombol" onClick={() => this.props.click(7)}>7</button>
        <button class="tombol" onClick={() => this.props.click(8)}>8</button>
        <button class="tombol" onClick={() => this.props.click(9)}>9</button><br />
        <button class="tombol" onClick={() => this.props.click('-')}>-</button>
        <button class="tombol" onClick={() => this.props.click(0)}>0</button>
        <button class="tombol" onClick={() => this.props.click('=')}>=</button>
      </div>)
  }
}
class NumberKali extends Component {
  render() {
    return (
      <div>
        <button class="tombol" onClick={() => this.props.click(1)}>1</button>
        <button class="tombol" onClick={() => this.props.click(2)}>2</button>
        <button class="tombol" onClick={() => this.props.click(3)}>3</button><br />
        <button class="tombol" onClick={() => this.props.click(4)}>4</button>
        <button class="tombol" onClick={() => this.props.click(5)}>5</button>
        <button class="tombol" onClick={() => this.props.click(6)}>6</button><br />
        <button class="tombol" onClick={() => this.props.click(7)}>7</button>
        <button class="tombol" onClick={() => this.props.click(8)}>8</button>
        <button class="tombol" onClick={() => this.props.click(9)}>9</button><br />
        <button class="tombol" onClick={() => this.props.click('*')}>*</button>
        <button class="tombol" onClick={() => this.props.click(0)}>0</button>
        <button class="tombol" onClick={() => this.props.click('=')}>=</button>
      </div>)
  }
}
class NumberBagi extends Component {
  render() {
    return (
      <div>
        <button class="tombol" onClick={() => this.props.click(1)}>1</button>
        <button class="tombol" onClick={() => this.props.click(2)}>2</button>
        <button class="tombol" onClick={() => this.props.click(3)}>3</button><br />
        <button class="tombol" onClick={() => this.props.click(4)}>4</button>
        <button class="tombol" onClick={() => this.props.click(5)}>5</button>
        <button class="tombol" onClick={() => this.props.click(6)}>6</button><br />
        <button class="tombol" onClick={() => this.props.click(7)}>7</button>
        <button class="tombol" onClick={() => this.props.click(8)}>8</button>
        <button class="tombol" onClick={() => this.props.click(9)}>9</button><br />
        <button class="tombol" onClick={() => this.props.click('/')}>/</button>
        <button class="tombol" onClick={() => this.props.click(0)}>0</button>
        <button class="tombol" onClick={() => this.props.click('=')}>=</button>
      </div>)
  }
}
class Tambah extends Component {
  state = {
    angka: ''
  }
  click = (v) => {
    const { angka } = this.state
    if (v === '=') {
      const hasil = angka
      this.props.calculate(hasil)
      console.log(hasil)
    } else {
      this.setState({
        angka: angka + v
      })
    }
  }
  render() {
    return (
      <div>
        <div class="panel">
          |{this.state.angka}|
        </div>
        <NumberTambah click={this.click} />
      </div>
    )
  }
}
class Kurang extends Component {
  state = {
    angka: ''
  }
  click = (v) => {
    const { angka } = this.state
    if (v === '=') {
      const hasil = angka
      this.props.calculate(hasil)
      console.log(hasil)
    } else {
      this.setState({
        angka: angka + v
      })
    }
  }
  render() {
    return (
      <div>
        <div class="panel">
          |{this.state.angka}|
        </div>
        <NumberKurang click={this.click} />
      </div>
    )
  }
}
class Kali extends Component {
  state = {
    angka: ''
  }
  click = (v) => {
    const { angka } = this.state
    if (v === '=') {
      const hasil = angka
      this.props.calculate(hasil)
      console.log(hasil)
    } else {
      this.setState({
        angka: angka + v
      })
    }
  }
  render() {
    return (
      <div>
        <div class="panel">
          |{this.state.angka}|
        </div>
        <NumberKali click={this.click} />
      </div>
    )
  }
}
class Bagi extends Component {
  state = {
    angka: ''
  }
  click = (v) => {
    const { angka } = this.state
    if (v === '=') {
      const hasil = angka
      this.props.calculate(hasil)
      console.log(hasil)
    } else {
      this.setState({
        angka: angka + v
      })
    }
  }
  render() {
    return (
      <div>
        <div class="panel">
          |{this.state.angka}|
        </div>
        <NumberBagi click={this.click} />
      </div>
    )
  }
}

class App extends Component {
  state = {
    operator: null,
    hasil: 0
  }
  select = (s) => {
    this.setState({ operator: s })
  }
  calculate = (hasil) => {
    if (hasil.includes('+')) {
      const index = hasil.indexOf('+')
      const angka1 = hasil.slice(0, index)
      const angka2 = hasil.slice(index + 1)
      const hasilakhir = parseInt(angka1) + parseInt(angka2)
      this.setState({
        hasil: hasilakhir
      })
    } else if (hasil.includes('-')) {
      const index = hasil.indexOf('-')
      const angka1 = hasil.slice(0, index)
      const angka2 = hasil.slice(index + 1)
      const hasilakhir = parseInt(angka1) - parseInt(angka2)
      this.setState({
        hasil: hasilakhir
      })
    } else if (hasil.includes('*')) {
      const index = hasil.indexOf('*')
      const angka1 = hasil.slice(0, index)
      const angka2 = hasil.slice(index + 1)
      const hasilakhir = parseInt(angka1) * parseInt(angka2)
      this.setState({
        hasil: hasilakhir
      })
    } else if (hasil.includes('/')) {
      const index = hasil.indexOf('/')
      const angka1 = hasil.slice(0, index)
      const angka2 = hasil.slice(index + 1)
      const hasilakhir = parseInt(angka1) / parseInt(angka2)
      this.setState({
        hasil: hasilakhir
      })
    }
  }

  render() {
    return (
      <div>
        <button class="tombol-panel" onClick={() => this.select('+')}>+</button>
        <button class="tombol-panel" onClick={() => this.select('-')}>-</button><br />
        <button class="tombol-panel" onClick={() => this.select(':')}>:</button>
        <button class="tombol-panel" onClick={() => this.select('x')}>x</button>
        <Hasil hasil={this.state.hasil} />
        { this.state.operator === ":" && <Bagi calculate={this.calculate} />}
        { this.state.operator === "x" && <Kali calculate={this.calculate} />}
        { this.state.operator === "+" && <Tambah calculate={this.calculate} />}
        { this.state.operator === "-" && <Kurang calculate={this.calculate} />}
      </div>
    )
  }
}

export default App;