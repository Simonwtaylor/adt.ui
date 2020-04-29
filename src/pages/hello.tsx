import * as React from 'react';

export interface HelloProps {
    
}
 
const Hello: React.FC<HelloProps> = () => {
    return (
        <h1>Hello</h1>
    );
}
 
export default Hello;