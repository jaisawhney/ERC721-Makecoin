import Form from "./Form";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

export default function Card() {
    return (
        <div className={'bg-white p-5 shadow'}>
            <CardHeader/>
            <Form/>
            <CardFooter/>
        </div>
    );
}