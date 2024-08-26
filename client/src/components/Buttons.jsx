import Button from 'react-bootstrap/Button';

export default function Buttons({ action, variant, text }) {
    return (
        <>
            <Button onClick={action} variant={variant}>{text}</Button>
        </>
    );
}