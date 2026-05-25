import { Component } from 'react';
import $ from 'jquery';

type ModalBoxProps = { title: string, answer: (answer: string) => void };

class ModalBox extends Component<ModalBoxProps> {

  constructor(props: ModalBoxProps) {
    super(props);

    this.closeModalBox = this.closeModalBox.bind(this);
    this.submitModalBox = this.submitModalBox.bind(this);
  }

  closeModalBox() {
    $('.js-modal-box-wrapper').fadeOut(() => {
      $('.js-modal-box-wrapper').hide();
    });
    this.props.answer('cancel');
  }

  submitModalBox() {
    $('.js-modal-box-wrapper').fadeOut(() => {
      $('.js-modal-box-wrapper').hide();
    });
    this.props.answer('accept');
  }

  render() {
    return (
      <div className="modal-box-wrapper js-modal-box-wrapper">
        <div className="modal-box">
          <h4 className="modal-box-title">{this.props.title}</h4>
          <button className="btn btn-outline" onClick={this.closeModalBox}>cancel</button>
          <button className="btn btn-primary" onClick={this.submitModalBox}>accept</button>
        </div>
        <div className="overlay" />
      </div>
    );
  }
}

export default ModalBox;
