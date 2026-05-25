const BackButton = ({ cb }: { cb: () => void }) => <button
    className="btn"
    onClick={cb}
>
    &#10005;
</button>;

export default BackButton;