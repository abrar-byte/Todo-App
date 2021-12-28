import { Component } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./Page.css"

class Page extends Component {
  state = {
    open: false,
    nama: 'ABRAR',
    value: ''
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onSaveModal = () => {
    this.setState({ nama: this.state.value })
    this.setState({ open: false })

  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <h1>{this.state.nama}</h1>
        <button className="button" onClick={this.onOpenModal}>CHANGE</button>
        <Modal open={open} onClose={this.onCloseModal}>
          <h2>Are you sure to change your name?</h2>
          <form>
            <input defaultValue={this.state.nama} onChange={this.handleChange} />
          </form>
          <button className="button" onClick={this.onCloseModal}>CLOSE</button><button className="button" onClick={this.onSaveModal}>SAVE</button>
        </Modal>
      </div>
    );
  }
}

export default Page