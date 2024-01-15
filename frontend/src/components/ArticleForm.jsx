"use client";

const BACKEND_URL = "http://localhost:8080";

import { useState, useRef } from "react";
import style from "@styles/ArticleForm.module.css";
import { IoImageOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { revalidateArticle } from "@utils/revalidation";

const ArticleForm = ({ existingArticle }) => {
  const imageInputRef = useRef(null);
  const { replace } = useRouter();

  const [title, setTitle] = useState(
    existingArticle ? existingArticle.title : "",
  );
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(
    existingArticle ? existingArticle.description : "",
  );
  const [content, setContent] = useState(
    existingArticle ? existingArticle.content : "",
  );
  const [finalMsg, setFinalMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const checkTitle = () => title.length >= 5 && title.length <= 80;
  const checkContent = () => content.length >= 10;
  const checkDescription = () =>
    description.length >= 5 && description.length <= 400;

  const handleImageChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (!selectedFile) return;
    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !checkTitle() ||
      !checkContent() ||
      !checkDescription() ||
      (!existingArticle && !image)
    ) {
      setIsError(true);
      return;
    }
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);

    try {
      let response = null;
      if (existingArticle) {
        response = await fetch(
          `${BACKEND_URL}/article/update/${existingArticle._id}`,
          {
            method: "PUT",
            body: formData,
            credentials: "include",
          },
        );
      } else {
        response = await fetch(`${BACKEND_URL}/article/add`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
      }

      if (response.status == 201) {
        if (existingArticle) revalidateArticle(existingArticle._id);
        const responseBody = await response.json();
        replace(`/article/${responseBody._id}`);
      } else {
        setFinalMsg("Failed to add an article");
      }
    } catch (error) {
      console.log(error);
      setFinalMsg("server error please try again later");
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of the article"
          className={`${style.article_input}`}
        />
        {isError && !checkTitle() && (
          <p className="text-red-400">
            The title cannot be shorter than 5 characters and longer than 42
          </p>
        )}
        <label htmlFor="image">Article image</label>
        <input
          type="file"
          id="image"
          name="image"
          className="hidden"
          ref={imageInputRef}
          accept=".png, .jpg, jpeg"
          onChange={handleImageChange}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            imageInputRef.current.click();
          }}
          className="bg-c_gray_lighter min-h-[60vh] relative"
        >
          {image || existingArticle ? (
            <Image
              src={
                existingArticle && !image
                  ? `${BACKEND_URL}/${existingArticle.image}`
                  : URL.createObjectURL(image)
              }
              fill
              alt="selected image file"
              className="object-cover"
            />
          ) : (
            <IoImageOutline className="m-auto text-8xl" />
          )}
        </button>
        {isError && !image && !existingArticle && (
          <p className="text-red-400">You have to include an image</p>
        )}
        <label htmlFor="description">Short article description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
          placeholder="Short and catchy description of your article"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`${style.article_area}`}
        ></textarea>
        {isError && !checkDescription() && (
          <p className="text-red-400">
            The description cannot be shorter than 5 characters and longer that 400
          </p>
        )}
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          placeholder="Content of your article"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${style.article_area}`}
        ></textarea>
        {isError && !checkContent() && (
          <p className="text-red-400">
            The content cannot be shorter than 10 characters
          </p>
        )}

        {finalMsg.length > 0 && (
          <p className="text-red-400 underline">{finalMsg}</p>
        )}

        <button
          className="border-2 text-white border-white mb-10 border-solid py-2 px-6 hover:bg-white hover:text-black"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
