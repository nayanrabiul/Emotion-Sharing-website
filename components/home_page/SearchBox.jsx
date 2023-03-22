import React, {useState, useEffect, useRef} from 'react';
import {Input, Dropdown, Menu, Pagination} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {useFetch} from "../../helpers/hooks.js";
import {fetchPosts} from "../../helpers/backend_helper.js";

function SearchBox() {
    const [posts, getPosts] = useFetch(fetchPosts, {}, false);//dont fetch on mount
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (searchQuery?.length >= 3) {
            getPosts({q: searchQuery});
            setShowMenu(true);
            setCurrentPage(1);
        }
    }, [searchQuery]);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         console.log('handleClickOutside called');
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             setShowMenu(false);
    //         }
    //     };
    //
    //     document.addEventListener('mousedown', handleClickOutside);
    //
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [dropdownRef]);

    const items = [];

    posts?.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(({id, title, body}) => {
        items.push({
            label: (<div className="p-4">
                <h2 className="text-lg font-bold">{title}</h2>
                <p>{body}</p>
            </div>), key: id,
        })
    })

    items.push({
        label: <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={posts?.length}
            onChange={(page) => setCurrentPage(page)}
            onShowSizeChange={(current, size) => setPageSize(size)}
            showSizeChanger
            showQuickJumper
        />, key: 'pagination'
    });

    const handleIputFocus = (e) => {
        if (e.target.value.length >= 3) setShowMenu(true); else setShowMenu(false)
        setSearchQuery(e.target.value)
    }

    return (<div>
        <Input placeholder="Search posts"
               onFocus={handleIputFocus}
               onChange={handleIputFocus}
               prefix={<SearchOutlined/>}
        />

        <Dropdown
            menu={{items}}
            placement="bottom"
            open={showMenu}
        >
            <div></div>
        </Dropdown>
    </div>);
}

export default SearchBox;