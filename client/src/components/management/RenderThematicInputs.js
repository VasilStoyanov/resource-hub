import React, { Component } from 'react';
import { Field } from 'redux-form';
import GlyphInput from '../common/GlyphInput';
// import { toast } from 'react-toastify';

class RenderThematicsInput extends Component {
    componentDidMount() {
        this.props.fields.push();
    }

    addThematic() {
        const fields = this.props.fields.getAll();
        const lastField = fields[fields.length - 1];

        if (!lastField || lastField.length < 3) {
            // toast('Topic name must contain atleast 3 symbols!', { className: 'red-toast' });
            return;
        }

        this.props.fields.push();
    }

    render() {
        const inputs = this.props.fields.map((thematic, index) =>
            (<li key={index}>
                 <div className='row'>
                    <div className='col-lg-10'>
                        <Field
                            name={thematic}
                            type="text"
                            component={GlyphInput}
                            handleClick={() => this.props.fields.remove(index)} 
                            glyph='remove'
                            placeholder={`thematic #${index + 1}`}
                        />
                    </div>
                    {index === this.props.fields.length - 1 && 
                        <button 
                            type="button" 
                            className='btn btn-sm btn-default' 
                            onClick={this.addThematic.bind(this)}
                        >
                            Add Thematic
                        </button>
                    }
                 </div>
            </li>    
            ));

        return (
             <ul>
                {inputs}
             </ul>
        );
    }
}

export default RenderThematicsInput;
