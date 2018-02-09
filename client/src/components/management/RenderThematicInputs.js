import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button } from 'react-bootstrap';
import GlyphInput from '../common/GlyphInput';
import { RenderInput } from '../common/RenderInput.js';

class RenderThematicsInput extends Component {
    componentDidMount() {
        this.props.fields.push();
    }

    addThematic() {
        if (!this.props.fields.getAll().some(n => !n || !n[Object.keys(n)[0]] || n[Object.keys(n)[0]].length < 3)) {
            this.props.fields.push();
        }
    }

    render() {
        const inputs = this.props.fields.map((thematic, index) =>
            (<li key={index}>
                 <div className='row'>
                    <div className='col-lg-10'>
                        <Field
                            name={`${thematic}.thematic-${index}`}
                            type="text"
                            component={RenderInput}
                            handleClick={() => this.props.fields.remove(index)} 
                            glyph='remove'
                            placeholder={`thematic #${index + 1}`}
                        />
                    </div>
                    {index === this.props.fields.length - 1 && 
                        <Button 
                            type="button" 
                            className='management-button' 
                            onClick={this.addThematic.bind(this)}
                        >
                            Add Thematic
                        </Button>
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
