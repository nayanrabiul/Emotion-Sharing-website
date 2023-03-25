import React, { useState, useEffect, useRef } from "react";
import { Input, Dropdown, Menu, Pagination, Form, Modal } from "antd";
import { useFetch } from "../../helpers/hooks.js";
import { fetchPosts } from "../../helpers/backend_helper.js";
import { FormInput } from "../Form/FormInput.jsx";
import { BsArrowRight } from "react-icons/bs";
import { GiCrossedBones } from "react-icons/gi";
import { SearchBorder } from "../common/Border.jsx";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();

  const [posts, getPosts] = useFetch(fetchPosts, {}, false); //dont fetch on mount
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (searchQuery?.length >= 1) {
      getPosts({ q: searchQuery });
      setShowMenu(true);
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const items = [];
  items.push({
    label: (
      <div className="flex w-full justify-end">
        <button
          onClick={() => {
            setShowMenu(false);
          }}
          className="px-3"
        >
          <GiCrossedBones />
        </button>
      </div>
    ),
    key: "cross",
  });

  posts?.length < 1
    ? items.push({
        label: <div className="p-4">No posts found</div>,
        key: "no-posts",
      })
    : posts
        ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .map(({ id, title, body }) => {
          items.push({
            label: (
              <SearchBorder span={24}>
                <div
                  key={id}
                  className="h-[100px] relative border cursor-pointer bg-white p-2 rounded dark:bg-dark dark:border-main"
                  onClick={() => {
                    setShowMenu(false);
                    navigate(`/post/${id}`);
                  }}
                >
                  <h2 className="text-lg text-cyan-800 font-semibold">
                    {title}
                  </h2>
                  <p className="text-gray-500">{body}</p>

                  <button className="center space-x-2 absolute bottom-2 right-2 p-1 hover:bg-main rounded cursor-pointer">
                    <p className="text-cyan-800">Read mode </p>
                    <BsArrowRight fill="#010014" />
                  </button>
                </div>
              </SearchBorder>
            ),
            key: id,
          });
        });

  items.push({
    label: (
      <div className="flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={posts?.length}
          onChange={(page) => setCurrentPage(page)}
          onShowSizeChange={(current, size) => setPageSize(size)}
          showSizeChanger
          showQuickJumper
        />
      </div>
    ),
    key: "pagination",
  });

  const handleIputFocus = (e) => {
    if (e.target.value.length >= 2) setShowMenu(true);
    else setShowMenu(false);
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Form
        onChange={handleIputFocus}
        onFinish={(values) => console.log(values)}
      >
        <FormInput name={"search"} placeholder={"Search..."} textarea />
      </Form>

      <Dropdown
        menu={{ items }}
        overlayStyle={{ width: 700 }}
        placement="bottom"
        open={showMenu}
        className="dark:bg-dark"
      >
        <div></div>
      </Dropdown>
    </div>
  );
}

export default SearchBox;
