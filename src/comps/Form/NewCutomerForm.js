import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'

//this is a xommit test

function NewCustomerForm(props) {
    return (
        <div className='text-left'>
            <AnalysisController func={props.func} /><br />
        </div>
    )
}
export default NewCustomerForm


const AnalysisController = props => {
    return (
        <Formik

            func={props.func}
            initialValues={{
                track_name: '',
                size_bytes: '',
                price: '0',
                description: '',
                sup_devices_num: '1',
                lang_num: '1',
                cont_rating:'4+',
                prime_genre:'Games',
                vpp_lic:'1',
            }}

            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                
                    if(values.track_name === ''){
                        errors.track_name = 'Please fill out'
                    }
                    if(values.size_bytes === ''){
                        errors.size_bytes = 'Please fill out'
                    }
                    if(values.price === ''){
                        errors.price = 'Please fill out'
                    }
                    if(values.description === ''){
                        errors.description = 'Please fill out'
                    }
                    if(values.sup_devices_num === ''){
                        errors.sup_devices_num = 'Please fill out'
                    }
                    if(values.lang_num === ''||values.lang_num === isNaN){
                        errors.lang_num = 'Please fill out'
                    }
                    if(values.cont_rating === ''){
                        errors.cont_rating = 'Please fill out'
                    }
                    if(values.prime_genre === ''){
                        errors.prime_genre = 'Please fill out'
                    }
                    if(values.vpp_lic === ''){
                        errors.vpp_lic = 'Please fill out'
                    }
                
                
                return errors
            }}
            onSubmit={async (values, actions) => {
                const data = Object.values(values)
                console.log('()()()',data)
                await props.func.azure(data)
            
            }}
        >
        {form => (
            <InputForm form={form} func={props.func}/>
        )}
        </Formik>
    )
}


const InputForm = props => (    
    <Form>
        <bs.Container>
            <bs.Row>
                <bs.Col>
                    <Input title="App Title" name="track_name" type="text" />
                </bs.Col>
            </bs.Row>
            <bs.Row>
                <bs.Col>
                    <Input title="Size in Bytes" name="size_bytes" type="number" />
                </bs.Col>
                <bs.Col>
                    <Input title="Price" name="price" type="text" />
                </bs.Col>
            </bs.Row>
            <bs.Row>
                <bs.Col>
                    <Input title="Description" name="description" type="text" />
                    <Input title="Number of Supported Devices" name="sup_devices_num" type="number" />
                    <Input Input title="Number of Supported Languages" name="lang_num" type="number" />
                </bs.Col>
            </bs.Row>
            <bs.Row>
                <bs.Col>
                    <First Input title="Genre" name="prime_genre" type="dropdown" />
                </bs.Col>
                <bs.Col>
                    <Second Input title="Content Rating" name="cont_rating" type="dropdown" />
                </bs.Col>
                <bs.Col>
                    <Option Input title="VPP License" name="vpp_lic" type="dropdown" />
                </bs.Col>
                </bs.Row>
            <bs.Row>
                <bs.Col>
                    <bs.Button type='submit' variant="dark" >Submit </bs.Button>
                </bs.Col>
            </bs.Row>
        </bs.Container>     
    </Form>    
)

const handleSubmit = async(e,func,formData) =>{
    e.preventDefault()
    // console.log('formdata',formData)
    const data = Object.values(formData)
    console.log('()()()',data)
    await func.azure(data)


}

const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
           <bs.Form.Label >{props.title}</bs.Form.Label>
            <bs.Form.Control
                disabled={props.disabled}
                type={props.type}
                
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)
const Option = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
           <bs.Form.Label>{props.title}</bs.Form.Label>
            <bs.Form.Control
                disabled={props.disabled}
                type={props.type}
                placeholder={props.title}
                {...rProps.field}
                as='select'
            >
                <option value="1">Yes</option>
                <option value="0">No</option>
            </bs.Form.Control>
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)
const Second = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
           <bs.Form.Label>{props.title}</bs.Form.Label>
            <bs.Form.Control
                disabled={props.disabled}
                type={props.type}
                placeholder={props.title}
                {...rProps.field}
                as='select'
            >
                <option value="4+">4+</option>
                <option value="12+">12+</option>
                <option value="17+">17+</option>
            </bs.Form.Control>
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)
const First = (props) =>(
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
           <bs.Form.Label>{props.title}</bs.Form.Label>
            <bs.Form.Control
                disabled={props.disabled}
                type={props.type}
                placeholder={props.title}
                {...rProps.field}
                as='select'
            >
                <option value="Games">Games</option>
                <option value="Education">Education</option>
                <option value="Reference">Reference</option>
                <option value="Social Networking">Social Networking</option>
                <option value="Business">Business</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Sports">Sports</option>
                <option value="Catalogs">Catalogs</option>
                <option value="Weather">Weather</option>
                <option value="Music">Music</option>
                <option value="Book">Book</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Medical">Medical</option>
                <option value="Utilities">Utilities</option>
                <option value="Travel">Travel</option>
                <option value="Navigation">Navigation</option>
                <option value="Photo & Video">Photo & Video</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Productivity">Productivity</option>
                <option value="News">News</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Shopping">Shopping</option>
            </bs.Form.Control>
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>

)