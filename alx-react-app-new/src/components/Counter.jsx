import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        },
        counterBox: {
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            padding: '40px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '30px',
            margin: '0 0 30px 0'
        },
        countLabel: {
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '10px'
        },
        countDisplay: {
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#667eea',
            marginBottom: '30px',
            transition: 'transform 0.3s ease',
            cursor: 'default'
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        button: {
            padding: '15px 25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: 'white',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        },
        incrementButton: {
            backgroundColor: '#28a745'
        },
        decrementButton: {
            backgroundColor: '#dc3545'
        },
        resetButton: {
            backgroundColor: '#6c757d'
        },
        helpText: {
            marginTop: '25px',
            fontSize: '0.9rem',
            color: '#888'
        }
    };

    const handleMouseEnter = (e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
    };

    const handleMouseLeave = (e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    };

    const handleMouseDown = (e) => {
        e.target.style.transform = 'scale(0.95)';
    };

    const handleMouseUp = (e) => {
        e.target.style.transform = 'scale(1.05)';
    };

    return (
        <div style={styles.container}>
            <div style={styles.counterBox}>
                <h1 style={styles.title}>Counter App</h1>

                <div>
                    <p style={styles.countLabel}>Current Count:</p>
                    <div
                        style={styles.countDisplay}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        {count}
                    </div>
                </div>

                <div style={styles.buttonContainer}>
                    <button
                        onClick={increment}
                        style={{ ...styles.button, ...styles.incrementButton }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    >
                        ➕ Increment
                    </button>

                    <button
                        onClick={decrement}
                        style={{ ...styles.button, ...styles.decrementButton }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    >
                        ➖ Decrement
                    </button>

                    <button
                        onClick={reset}
                        style={{ ...styles.button, ...styles.resetButton }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    >
                        🔄 Reset
                    </button>
                </div>

                <p style={styles.helpText}>
                    Click the buttons above to modify the counter
                </p>
            </div>
        </div>
    );
}

export default Counter;