const enterKeySubmit = (e: React.KeyboardEvent<HTMLInputElement>, f: () => void): void => {
    if (e.key === 'Enter') {
        f()
    }
}

export default enterKeySubmit