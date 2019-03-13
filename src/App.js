import React, { Component } from 'react';
import Button from './components/Button';
import Link from './components/Link';
import Breadcrumb from './components/Breadcrumb';

const ref = React.createRef();

class App extends Component {
    render() {
        return (
            <main>
                {/* Button */}
                <div>
                    <Button
                        ref={ref}
                        label="Click Me"
                        onClick={event => { console.log('Button Clicked') }}
                        className="btn-secondary"
                        data={{}}
                    />
                </div>
                {/* Link */}
                <div>
                    <Link
                        label="google.com"
                        href="https://www.google.com"
                        className="link-primary"
                        data={{ target: '_blank' }}
                    />
                </div>
                {/* Breadcrumb */}
                <div>
                    <Breadcrumb
                        breadcrumbs={[
                            { label: 'Tab 1', value: 'tab1' },
                            { label: 'Tab 2', value: 'tab2' },
                            { label: 'Tab 3', value: 'tab3' }
                        ]}
                        activeBreadcrumb={1}
                        className="breadcrumb"
                        onClick={event => { debugger; console.log('Tab clicked') }}
                    />
                </div>
            </main>
        );
    }
}

export default App;
