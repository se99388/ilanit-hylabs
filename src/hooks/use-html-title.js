import { useEffect } from 'react';

const useHTMLTitle = title => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export default useHTMLTitle;
