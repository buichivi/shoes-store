const AdidasLogo = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="currentColor"
            className={className}
            viewBox="0 0 192.756 192.756"
        >
            <g fillRule="evenodd" clipRule="evenodd">
                <path fill="transparent" d="M0 0h192.756v192.756H0V0z" />
                <path d="M181.195 120.644c.787.45 1.576.647 2.42.647h.027c.846 0 1.635-.197 2.422-.647a4.293 4.293 0 0 0 1.803-1.802 4.822 4.822 0 0 0 .646-2.421c0-.873-.197-1.689-.646-2.478-.424-.788-1.043-1.379-1.83-1.802-.789-.422-1.576-.646-2.395-.646h-.027a5.356 5.356 0 0 0-2.393.646c-.787.423-1.379 1.014-1.83 1.802a4.877 4.877 0 0 0-.646 2.478c0 .816.197 1.633.646 2.421a4.282 4.282 0 0 0 1.803 1.802zm-1.097-6.278a3.94 3.94 0 0 1 1.52-1.521c.646-.338 1.322-.534 1.998-.534h.027c.676 0 1.352.196 2 .534a3.953 3.953 0 0 1 1.52 1.521c.367.647.535 1.323.535 2.055a4.03 4.03 0 0 1-.535 2.026 3.795 3.795 0 0 1-1.492 1.492 4.04 4.04 0 0 1-2.027.535h-.027a4.05 4.05 0 0 1-2.027-.535 3.803 3.803 0 0 1-1.49-1.492c-.367-.647-.564-1.322-.564-2.026-.003-.732.194-1.407.562-2.055z" />
                <path d="M182.32 116.871h.506c.311 0 .535.057.676.197.057.028.086.057.113.084.225.197.479.592.789 1.127l.479.844h1.014l-.619-1.041c-.311-.479-.592-.845-.789-1.042a1.385 1.385 0 0 0-.451-.281c.451-.028.816-.197 1.098-.479s.424-.619.424-1.014c0-.281-.086-.535-.254-.76a1.217 1.217 0 0 0-.676-.507c-.225-.084-.562-.141-1.014-.141-.084 0-.197-.028-.309-.028h-1.83v5.292h.844v-2.251h-.001zm0-2.309h1.295c.254.029.422.057.535.085a.622.622 0 0 1 .365.281c.084.112.113.254.113.423a.703.703 0 0 1-.254.562c-.141.141-.395.197-.76.226h-1.295v-1.577h.001zM55.898 115.154h7.601l-7.601-12.668-6.419-10.668-27.277 16.383 4.166 6.953h29.53zM126.611 115.154h37.131l-23.113-38.509-25.559-42.507-10.529 6.334L87.82 50.521l16.721 27.841 22.07 36.792zM113.635 127.85c-2.619-1.688-5.688-2.674-9.01-2.674h-.084c-9.176.056-16.636 7.544-16.636 16.721 0 9.178 7.46 16.665 16.636 16.722h.084c3.322 0 6.391-.985 9.01-2.674v1.745h7.684v-42.535h-7.684v12.695zm0 15.793c-.816 4.223-4.561 7.459-9.01 7.459h-.084c-5.039-.056-9.12-4.166-9.12-9.205 0-5.038 4.081-9.148 9.12-9.177h.084c4.449 0 8.193 3.21 9.01 7.432v3.491zM149.723 127.85a16.451 16.451 0 0 0-9.008-2.674h-.086c-9.176.056-16.635 7.544-16.635 16.721 0 9.178 7.459 16.665 16.635 16.722h.086c3.322 0 6.418-.985 9.008-2.674v1.745h7.686v-31.67h-7.686v1.83zm0 15.793c-.816 4.223-4.561 7.459-9.008 7.459h-.086c-5.037-.056-9.119-4.166-9.119-9.205 0-5.038 4.082-9.148 9.119-9.177h.086c4.447 0 8.191 3.21 9.008 7.432v3.491zM184.742 139.814c-.281-.142-.676-.282-1.127-.451-1.717-.591-4.504-1.323-8.389-2.167-3.406-.761-5.123-1.745-5.123-2.984 0-.873.309-1.577.9-2.083.789-.676 2.195-1.014 4.223-1.014 2.055 0 3.547.451 4.42 1.323.535.535.928 1.491 1.182 2.843h8.164c0-3.997-1.633-6.868-4.842-8.613a3.19 3.19 0 0 0-.535-.281c-2.225-1.042-5.18-1.577-8.867-1.577-4.477 0-7.854 1.183-10.105 3.575-1.801 1.914-2.674 4.25-2.674 7.009 0 3.436 1.688 5.912 5.123 7.517 1.295.619 4.447 1.492 9.459 2.562 3.35.732 5.037 1.774 5.037 3.097 0 .789-.336 1.464-1.068 2.083-.93.788-2.338 1.183-4.223 1.183-2.506 0-4.279-.422-5.32-1.238-1.043-.788-1.578-1.942-1.578-3.406h-8.557c0 3.885 1.633 6.784 4.926 8.697 2.619 1.492 6.053 2.253 10.305 2.253 2.842 0 5.375-.479 7.543-1.407.451-.197.846-.395 1.268-.62 3.35-1.857 5.039-4.813 5.039-8.866-.001-3.325-1.72-5.803-5.181-7.435zM28.564 127.85a16.615 16.615 0 0 0-9.036-2.674h-.085c-9.148.056-16.608 7.544-16.608 16.721 0 9.178 7.46 16.665 16.608 16.722h.085c3.322 0 6.418-.985 9.036-2.674v1.745h7.685v-31.67h-7.685v1.83zm0 15.793c-.816 4.223-4.561 7.459-9.036 7.459h-.085c-5.01-.056-9.092-4.166-9.092-9.205 0-5.038 4.082-9.148 9.092-9.177h.085c4.476 0 8.22 3.21 9.036 7.432v3.491zM76.532 122.671h8.361v-7.348h-8.361v7.348zM76.532 157.689h8.361v-32.513h-8.361v32.513zM65.019 127.85a16.616 16.616 0 0 0-9.037-2.674h-.084c-9.177.056-16.637 7.544-16.637 16.721 0 9.178 7.459 16.665 16.637 16.722h.084a16.61 16.61 0 0 0 9.037-2.674v1.745h7.685v-42.535h-7.685v12.695zm0 15.793c-.816 4.223-4.561 7.459-9.037 7.459h-.084c-5.039-.056-9.121-4.166-9.121-9.205 0-5.038 4.082-9.148 9.121-9.177h.084c4.476 0 8.22 3.21 9.037 7.432v3.491zM113.605 115.154l-9.064-15.144-22.266-37.046-26.377 15.877-.901.534.901 1.492 20.605 34.287H113.605z" />
            </g>
        </svg>
    );
};

export default AdidasLogo;